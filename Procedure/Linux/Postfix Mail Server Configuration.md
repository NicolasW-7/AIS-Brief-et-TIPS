# Postfix Mail Server Configuration

This document provides the configuration steps for setting up a Postfix mail server on a Linux machine.

## **Needs for this installation**

- A debian Machine
- An active domain
- A relayhost mail // You can install a dovecot server for made IMAP ou POP3 Configuration (needed for email)

## Installation

1. **Update the package list and install Postfix:**
    ```bash
    sudo apt update
    sudo apt install postfix
    ```

2. **During installation, select "Internet Site" and enter your domain name.**

## Configuration

### Postfix Configuration

Edit the Postfix main configuration file `/etc/postfix/main.cf`:

```ini
# Basic Configuration
myhostname = mail.example.com
mydomain = example.com
myorigin = $mydomain
inet_interfaces = all
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
relayhost =

# Trusted Networks
mynetworks = 127.0.0.0/8, [::1]/128

# Mailbox Directory
home_mailbox = Maildir/

# Security
smtpd_banner = $myhostname ESMTP $mail_name (Ubuntu)
biff = no
append_dot_mydomain = no

# TLS Settings (if necessary)
# smtpd_tls_cert_file = /etc/ssl/certs/mail.example.com.crt
# smtpd_tls_key_file = /etc/ssl/private/mail.example.com.key
# smtpd_use_tls = yes
# smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
# smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache
```

*TLS configuration is not always necessary.*

After completing the configuration, restart the Postfix service:

```Bash
sudo systemctl restart postfix
```

Useful commands to test your Postfix configuration:

```sh
echo "email content" | mail -s "email subject" address@mail
echo "email content" | mutt -s "email subject" -a /path/to/attachment -- address@mail
```

Check your target email address; if you receive the email, you have successfully configured your self-hosted mail server. 

## Limitations of Webmail in Postfix Configuration

- Access to emails: Postfix does not provide an IMAP or POP3 server to access emails remotely. For this, you would need an additional server like Dovecot.
- Webmail: If you want to access your emails via a web interface, you will need to install a solution like Roundcube, which also requires an IMAP server.
- Anti-spam and antivirus: Postfix alone does not provide protection against spam and viruses. You will need to configure additional solutions like SpamAssassin and ClamAV.
- TLS/SSL: To secure communications with TLS/SSL, you will need to configure the necessary certificates and enable TLS options in Postfix's configuration.

## Glossary

- SMTP (Simple Mail Transfer Protocol) is the standard protocol used for sending emails over the Internet.

- IMAP (Internet Message Access Protocol) is a protocol used by email clients to retrieve emails from a mail server. It allows users to access their email messages from multiple devices, while leaving the messages stored on the server.

- POP3 (Post Office Protocol version 3) is another protocol used for retrieving emails from a remote server to a local client. Unlike IMAP, POP3 typically downloads emails to the client, which are then usually deleted from the server, although this behavior can be configured.

- TLS (Transport Layer Security) and SSL (Secure Sockets Layer) are cryptographic protocols that provide secure communication over a computer network. In the context of email, TLS/SSL is used to encrypt the communication between email clients or servers, ensuring that emails are transmitted securely and cannot be easily intercepted by third parties.
