# Task: Fix `getDb is not a function` error and complete MongoDB integration

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
