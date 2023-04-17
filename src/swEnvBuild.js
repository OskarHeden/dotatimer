import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

fs.writeFileSync(
	'./src/swenv.js',
	`
export const process = {
  env: {
    VERCEL_GIT_COMMIT_SHA: '${process.env.VERCEL_GIT_COMMIT_SHA}',
    ETT_TILL_TEST: '${process.env.ETT_TILL_TEST}',
  }
}
`
);
