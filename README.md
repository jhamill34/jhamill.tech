## Build 

Using node version 16 run in `workspace/site`:

```bash 
yarn install 
yarn build 
```


## Publish

```bash
export BUCKET_NAME="...."
aws s3 sync --delete ./public s3://${BUCKET_NAME}
```

My site is running behind cloud front so I also need to invalidate the cloudfront cache after this
or wait for the TTL to expire.

```bash 
#this requires jq and fzf to be installed
DISTRIBUTION_ID=$(aws cloudfront list-distributions --profile personal | jq -r '.DistributionList.Items[] | "\(.Id) \(.Aliases.Items[])"' | fzf | cut -d ' ' -f 1)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --profile personal
```

