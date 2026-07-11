<?php
/**
 * Minimal dependency-free SMTP mailer.
 * Supports STARTTLS (port 587) and implicit SSL (port 465) with AUTH LOGIN.
 * No Composer / PHPMailer required.
 */
class SMTPMailer
{
    private string $host;
    private int $port;
    private string $secure; // 'tls' | 'ssl' | ''
    private string $username;
    private string $password;
    private $socket;
    private array $errors = [];

    public function __construct(string $host, int $port, string $secure, string $username, string $password)
    {
        $this->host     = $host;
        $this->port     = $port;
        $this->secure   = strtolower($secure);
        $this->username = $username;
        $this->password = $password;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * @param string $fromEmail
     * @param string $fromName
     * @param string|array $to  single email or array of emails
     * @param string $subject
     * @param string $htmlBody
     * @param string|null $replyTo
     * @param array $attachments  each item: ['path' => string, 'name' => string, 'mime' => string]
     */
    public function send(string $fromEmail, string $fromName, $to, string $subject, string $htmlBody, ?string $replyTo = null, array $attachments = []): bool
    {
        $toList = is_array($to) ? $to : array_map('trim', explode(',', $to));

        $target = ($this->secure === 'ssl' ? 'ssl://' : '') . $this->host;
        $this->socket = @stream_socket_client(
            $target . ':' . $this->port,
            $errno,
            $errstr,
            15,
            STREAM_CLIENT_CONNECT
        );

        if (!$this->socket) {
            $this->errors[] = "Connection failed: $errstr ($errno)";
            return false;
        }

        stream_set_timeout($this->socket, 15);

        if (!$this->expect('220')) return $this->fail('No greeting from server');

        $this->command("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
        if (!$this->expect('250')) return $this->fail('EHLO failed');

        if ($this->secure === 'tls') {
            $this->command("STARTTLS");
            if (!$this->expect('220')) return $this->fail('STARTTLS not accepted');

            if (!@stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                return $this->fail('TLS handshake failed');
            }

            $this->command("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
            if (!$this->expect('250')) return $this->fail('EHLO after STARTTLS failed');
        }

        $this->command("AUTH LOGIN");
        if (!$this->expect('334')) return $this->fail('AUTH LOGIN not accepted');

        $this->command(base64_encode($this->username));
        if (!$this->expect('334')) return $this->fail('Username rejected');

        $this->command(base64_encode($this->password));
        if (!$this->expect('235')) return $this->fail('Authentication failed - check SMTP username/password');

        $this->command("MAIL FROM:<{$fromEmail}>");
        if (!$this->expect('250')) return $this->fail('MAIL FROM rejected');

        foreach ($toList as $rcpt) {
            $this->command("RCPT TO:<{$rcpt}>");
            if (!$this->expect('250')) return $this->fail("RCPT TO rejected for {$rcpt}");
        }

        $this->command("DATA");
        if (!$this->expect('354')) return $this->fail('DATA command rejected');

        $headers   = [];
        $headers[] = "From: {$fromName} <{$fromEmail}>";
        $headers[] = "To: " . implode(', ', $toList);
        if ($replyTo) {
            $headers[] = "Reply-To: {$replyTo}";
        }
        $headers[] = "Subject: " . $this->encodeSubject($subject);
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Date: " . date('r');

        if (empty($attachments)) {
            $headers[] = "Content-Type: text/html; charset=UTF-8";
            $body = $htmlBody;
        } else {
            $boundary = 'bnd_' . bin2hex(random_bytes(12));
            $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

            $body  = "--{$boundary}\r\n";
            $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
            $body .= $htmlBody . "\r\n\r\n";

            foreach ($attachments as $att) {
                if (empty($att['path']) || !is_file($att['path'])) {
                    continue;
                }
                $content = base64_encode(file_get_contents($att['path']));
                $content = chunk_split($content, 76, "\r\n");
                $name    = $att['name'] ?? basename($att['path']);
                $mime    = $att['mime'] ?? 'application/octet-stream';

                $body .= "--{$boundary}\r\n";
                $body .= "Content-Type: {$mime}; name=\"{$name}\"\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n";
                $body .= "Content-Disposition: attachment; filename=\"{$name}\"\r\n\r\n";
                $body .= $content . "\r\n";
            }

            $body .= "--{$boundary}--";
        }

        $message = implode("\r\n", $headers) . "\r\n\r\n" . $this->stuffDots($body) . "\r\n.";

        $this->command($message);
        if (!$this->expect('250')) return $this->fail('Message not accepted by server');

        $this->command("QUIT");
        fclose($this->socket);

        return true;
    }

    private function encodeSubject(string $subject): string
    {
        return '=?UTF-8?B?' . base64_encode($subject) . '?=';
    }

    private function stuffDots(string $body): string
    {
        // RFC 5321 dot-stuffing: lines starting with "." get an extra "."
        return preg_replace('/^\./m', '..', $body);
    }

    private function command(string $cmd): void
    {
        fwrite($this->socket, $cmd . "\r\n");
    }

    private function expect(string $code): bool
    {
        $response = '';
        while ($line = fgets($this->socket, 515)) {
            $response .= $line;
            // Multi-line responses have a "-" after the code; final line has a space
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        if (strpos($response, $code) !== 0) {
            $this->errors[] = "Expected {$code}, got: " . trim($response);
            return false;
        }
        return true;
    }

    private function fail(string $msg): bool
    {
        $this->errors[] = $msg;
        if (is_resource($this->socket)) {
            fclose($this->socket);
        }
        error_log('SMTPMailer error: ' . $msg . ' | ' . implode(' | ', $this->errors));
        return false;
    }
}
