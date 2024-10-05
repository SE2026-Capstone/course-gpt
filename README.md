

# Redis setup

Run the following command to set up a local Redis instance

```bash
docker run --name course-gpt-redis -d \
  -p 6379:6379 \
  redis:latest \
  redis-server --maxmemory-policy noeviction
```

To connect to the instance use `redis-cli`

# Setting up auth locally

1. Generate secret in .env file with `npx auth secret`.
2. Create a [new Google Cloud project](https://developers.google.com/workspace/guides/create-project).
3. Create an external [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent). Fill out only the required info, keep clicking Next.
4. On the [Credentials page](https://console.cloud.google.com/apis/credentials), click "Create credentials" and select "OAuth client ID".
5. Select "Web application" for Application type.
6. Enter the following information:

|                               | For development                                  | For production                                   |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Authorized JavaScript origins | `http://localhost:3000`                          | `https://{YOUR_DOMAIN}`                          |
| Authorized redirect URIs      | `http://localhost:3000/api/auth/callback/google` | `https://{YOUR_DOMAIN}/api/auth/callback/google` |

7. Update your `.env` file with the Google Client ID and Client secret shown in the "OAuth client created" dialog.