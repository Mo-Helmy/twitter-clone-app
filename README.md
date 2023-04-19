## IntroDuction

- you can preview this project with [Twitter Clone App](https://twitter-clone-app-tau.vercel.app/).

## dependencies

- Next.js
- React
- tailwindcss
- zustand
- swr
- next-auth
- react-toastify
- prisma
- mongodb
- aws-sdk

## API Endpoints

- `/api/posts` method `GET`
- `/api/posts` method `GET` query `userId`
- `/api/posts` method `POST` body `body` require `serverAuth`
- `/api/posts/[postId]` method `GET`
- `/api/notifications/[userId]` method `GET`
- `/api/comments` method `POST` body `body` query `postId` require `serverAuth`
- `/api/current` method `GET` require `serverAuth`
- `/api/edit` method `PATCH` body `name, username, bio, profileImageKey, coverImageKey` require `serverAuth`
- `/api/follow` method `POST` body `userId` require `serverAuth`
- `/api/follow` method `DELETE` body `userId` require `serverAuth`
- `/api/like` method `POST` body `postId` require `serverAuth`
- `/api/like` method `DELETE` body `postId` require `serverAuth`
- `/api/register` method `POST` body `email, username, name, password` require `serverAuth`
- `/api/uploadkey` method `POST` body `key, body`
- `/api/users` method `GET`
- `/api/users/[userId]` method `GET`

## Start local development

- Cloning the repository

```shell
git clone https://github.com/Mo-Helmy/twitter-clone-app
```

- Install packages

```shell
npm i
```

- Setup .env file

```js
# create mongodb account and database
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
# create aws account and IAM account with cli programatic access to get access key_id and secret_key
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
# create aws s3 bucket
AWS_BUCKET="bucket name"
AWS_REGION=
AWS_PROFILE=

S3_URL=
```

- push schema

```shell
npx prisma db push
```

- run local

```shell
npm run dev
```

## mongodb schema

- User Table

```js
  id              String @id @default(auto()) @map("_id") @db.ObjectId
  name            String?
  username        String?   @unique
  bio             String?
  email           String?   @unique
  emailVerified   DateTime?
  image           String?
  coverImage      String?
  profileImage    String?
  hashedPassword  String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  followingIds    String[] @db.ObjectId
  hasNotification Boolean?

  posts           Post[]
  comments        Comment[]
  notifications   Notification[]
```

- Post Table

```js
  id                 String @id @default(auto()) @map("_id") @db.ObjectId
  body               String
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  userId             String @db.ObjectId
  likedIds           String[] @db.ObjectId
  image              String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  comments          Comment[]
```

- Comment Table

```js
  id                 String @id @default(auto()) @map("_id") @db.ObjectId
  body               String
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  userId             String @db.ObjectId
  postId             String @db.ObjectId

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)
```

- Notification Table

```js
  id                 String @id @default(auto()) @map("_id") @db.ObjectId
  body               String
  userId             String @db.ObjectId
  createdAt          DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
```

## CI/CD

- create new account to Vercel
- link it to github account
- create new project and select project repo from github account
- add env variables from local .env file to vercel project before start building.
- start build process
- Project is deoployed to vercel, just add new commit to git repo and it will be deployed automatically.
