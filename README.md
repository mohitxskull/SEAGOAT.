# [SEAGOAT](https://seagoat.vercel.app/) 
`V:Gross:0.1.002-Beta`

<div style="display:flex">
<img src="https://i.giphy.com/media/mDSGaOdQxzdseSPdAi/giphy.webp" alt="drawing" height="200"/>
<img src="https://i.giphy.com/media/Lqmp9tVPIvtyyKQneQ/giphy.webp" alt="drawing" height="200"/>
</div>

## Built with
- [Supabase](https://supabase.com/)
    - Supabase is used for authentication and storing encrypted data.
    - Each table is secured by RLS ([```Row Level Security```](https://supabase.com/docs/learn/auth-deep-dive/auth-row-level-security)) policies.
- Next.js
- [Mantine](https://mantine.dev/)
- CryptoJS
    -  CryptoJS to encrypt data ([`AES256`](https://cryptojs.gitbook.io/docs/#the-cipher-algorithms)).
- BcryptJS

## To do
- ~~View encrypted password~~
- Settings page
    - Change password
    - Change vault password
    - Change username
    - Lock vault is not active for X minutes ([`idletimer`](https://github.com/SupremeTechnopriest/react-idle-timer))
- Ghost folders/passwords ([`see`](https://github.com/cryptee/web-client/issues/33))
- Folders
- Add Encryption Flowchat to README
- ```/dev/```
On dev path you can see how encryption works in seagoat.
- New input options in add form
- Tools
    - Password generator
    - Password breach

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

---
> Made and Designed by [`Skull`](https://www.instagram.com/mohitxskull.dev/)
