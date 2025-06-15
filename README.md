# CryptoChat (ICMP + AES-256-CTR)

🔐 Encrypted peer-to-peer chat over ICMP (ping), using AES-256-CTR encryption and PBKDF2 with SHA-256.

> Updated for modern Node.js (v16+), uses raw sockets and requires `sudo`.

---

## ⚠️ Requirements

- Two **separate** devices (ICMP over `127.0.0.1` will NOT work properly)
- Node.js **v16 or higher**
- Linux or macOS (must support raw sockets)
- Must run as `sudo` (root privileges needed)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/cryptochat
cd cryptochat
npm install
```

Or install globally:

```bash
sudo npm install -g .
```

---

## 🚀 Usage

### 🟢 Receive messages (Server)

Run on device A (receiver):

```bash
sudo node cryptochat.js server <encryption_key>
```

Example:

```bash
sudo node cryptochat.js server mySecretKey
```

---

### 🔵 Send messages (Client)

Run on device B (sender):

```bash
sudo node cryptochat.js client <target_ip> <encryption_key>
```

Example:

```bash
sudo node cryptochat.js client 192.168.0.42 mySecretKey
```

Type your message and press **Enter** to send.

---

## 🛠 How It Works

- Messages are encrypted using `AES-256-CTR`
- Key is derived using PBKDF2 with `SHA-256`
- Each message is split into 31-byte encrypted chunks
- Sent inside **ICMP Echo Request** packets
- Receiver listens, decrypts, and prints the message

### First Packet (Initialization)

| Byte        | Content              |
|-------------|----------------------|
| Byte 0      | `0x3e` marker         |
| Bytes 1–15  | Salt (random)        |
| Bytes 16–31 | IV (random)          |

### Encrypted Chunks

Each packet:
- Starts with a length byte
- Followed by encrypted content (max 31 bytes)

### End Packet

| Byte  | Content       |
|-------|---------------|
| 0     | `0x3e`        |
| 1–31  | All `0xff`    |

Marks the end of a message.

---

## 🧪 Example

**On receiver device:**

```bash
sudo node cryptochat.js server testkey123
```

**On sender device:**

```bash
sudo node cryptochat.js client 192.168.1.25 testkey123
```

Now type and send messages!

---

## ❗ Notes

- Does **not** work reliably on localhost (`127.0.0.1`)
- Make sure ICMP is allowed through firewalls
- Run both ends with the **same encryption key**

---

## 🔐 Security

- Uses AES-256 in CTR mode
- Keys derived with PBKDF2 (SHA-256, 1000 iterations)
- No data is sent in plain text

---

## 🧠 Contributing

Pull requests welcome!

Ideas:
- Optional TCP/UDP fallback
- File transfer support
- Web interface

---

## 📖 References

- [AES-CTR Mode](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_(CTR))
- [ICMP Protocol](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)
- [raw-socket (npm)](https://www.npmjs.com/package/raw-socket)

---

## ⚠ Disclaimer

This tool manipulates ICMP packets. Some networks may block or inspect them. Use at your own risk and only in safe environments.
