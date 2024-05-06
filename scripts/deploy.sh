aws s3 sync --delete ./dist s3://${BUCKET_NAME}
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --profile personal
