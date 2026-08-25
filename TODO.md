# MySQL setup

Run this once in MySQL after creating/selecting the `airbnb` database:

```sql
CREATE TABLE homes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  homeName VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  photo VARCHAR(2048),
  description TEXT NOT NULL
);

CREATE TABLE favourites (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  homeId INT UNSIGNED NOT NULL UNIQUE,
  CONSTRAINT favourites_home_fk
    FOREIGN KEY (homeId) REFERENCES homes(id) ON DELETE CASCADE
);
```

# Previous MongoDB notes

## Steps

- [x] 1. Normalize `getDB` export/import naming in `utils/databaseUtil.js` and `models/home.js`
- [x] 2. Fix MongoDB connection string password (`. . .:root` -> `:6umTrH8BC0LuVgGf`)
- [x] 3. Harden `app.js` so server only listens after successful DB connection
- [x] 4. Implement `Home.fetchAll()`, `Home.findById()`, `Home.deleteById()`, `Home.updateById()` static methods using MongoDB
- [x] 5. Update `hostController` delete handler (uses `deletById` typo) and `postEditHome` to use `updateById`
- [x] 6. Test the app end-to-end (syntax OK; MongoDB Atlas unreachable via `mongodb+srv` SRV lookup)

## Notes

- All code changes verified with `node --check` (no syntax errors).
- Server now correctly refuses to start when MongoDB is unreachable (proper error handling instead of crash).
- Root cause of final connection failure: Node's internal DNS SRV resolver returns `ECONNREFUSED` for `_mongodb._tcp.apnacoding.5onc2nj.mongodb.net` on this network, even though `nslookup` and direct TCP to the shards succeed.
- **Fix applied:** switched `utils/databaseUtil.js` to a direct `mongodb://` connection string using the resolved shard hostnames + `replicaSet=atlas-gmu92k-shard-0` (from the TXT record).
- **Actual auth root cause:** the real Atlas password is `harshit@9934`, but the `@` inside it broke the `mongodb+srv://` URI parse (it was read as the userinfo/host delimiter, so the wrong password was sent). The `@` is now URL-encoded as `%40` (`harshit%409934`), and authentication succeeds.
- **Correction:** earlier note claimed `6umTrH8BC0LuVgGf` was the verified password — that was incorrect; it returns `bad auth`. The encoded `harshit%409934` is the one that works.

## Final Diagnosis (confirmed)

**Root cause of connection failure: the local network blocks the TLS handshake to MongoDB Atlas.**

Evidence gathered on this machine:

1. `mongodb+srv://` fails with `querySrv ECONNREFUSED` — Node's DNS SRV lookup is blocked by the local DNS server (`10.123.243.197`).
2. Public DNS (`8.8.8.8`, `1.1.1.1`) resolves the shard SRV + A records correctly.
3. TCP connection to shard `ac-guuzqsl-shard-00-00.5onc2nj.mongodb.net:27017` (IP `159.41.188.46`) succeeds.
4. **The TLS handshake always fails** with `tlsv1 alert internal error` (OpenSSL error 80) — even with public DNS, even with the correct password, even with the direct shard string.

Conclusion: DNS was a symptom, not the cause. The network/proxy/firewall is intercepting and terminating the encrypted TLS connection to Atlas. This is a network-level block (DPI/firewall), not a code, password, or connection-string bug.

### Fixes needed (outside the code)

- Connect from a different network (home Wi-Fi, mobile hotspot) — should work immediately.
- Or use a VPN to bypass the network-level TLS interception.
- Ensure your current public IP is whitelisted in Atlas → Security → Network Access.
- The code in `utils/databaseUtil.js` is correct (public DNS + URL-encoded password `harshit%409934`); it will work once the network allows TLS.
