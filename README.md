# Nautilus Examples

A TypeScript project showing [Nautilus](https://github.com/deltaDAO/nautilus) usage examples in different configurations.

## Quick start:

1. Install node modules:
   ```sh
   npm i
   ```
2. Setup the `.env` file:

   ```sh
   cp ./example.env ./.env
   ```

   Fill in variables in `.env`:

   | Variable    | Value                                                           |
   | ----------- | --------------------------------------------------------------- |
   | NETWORK     | `GENX`, `PONTUSXDEV`, `PONTUSXTEST`                             |
   | PRIVATE_KEY | private key of your account (you can export this from MetaMask) |

   > The account needs to be funded with tokens. Depending on the example and network either `gx` (`GENX`) or EUROe (`PONTUSXDEV`, `PONTUSXTEST`) for the network fees are required. You can contact deltaDAO under contact@delta-dao.com to receive tokens and onboarding.
3. Update the necessary scripts as needed

   Go to the `publish.ts`, `edit.ts`, `access.ts` or `compute.ts` files and change or update them according to your needs. Working code examples are provided in each file.

4. Uncomment and adjust functions you want to test:

   Go into the `index.ts` file and look for the ℹ️ in the `main()` function. You can uncomment the functions you want to test and save the file.

5. Start the script:

   ```sh
   npm start
   ```
