# TokenManager reference implementation

This is basic implementation of pubnub access token manager server api. Which generates and persist tokens.
Client application may call this apis to generate or get the token.

For sake of simplicity, this application persists token in simple json file. Data provider can be replaced by monogdb or any efficient db.

### Run

Provide required keyset values in `.env` file. and run:

```bash
npm run start
```
