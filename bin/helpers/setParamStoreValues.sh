source ./.env
# Copy the env.example to .env and populate the variables with correct values
# The .env file is ignored by git so you shouldn't accidentally
# add it to your repo, but you should still remove it once you've
# run this helper script.

if [ -n "$1" ]; then
  echo "Alternate profile selected. Using profile '$1' for cli commands"
  export AWS_PROFILE=$1
fi

NAME_PREFIX="/favro-gitlab/$STAGE"
aws ssm put-parameter --name "$NAME_PREFIX/favro/user" --type "String" --value "$FAVRO_USER"
aws ssm put-parameter --name "$NAME_PREFIX/favro/key" --type "SecureString" --value "$FAVRO_KEY"
aws ssm put-parameter --name "$NAME_PREFIX/favro/orgId" --type "String" --value "$FAVRO_COMPANY"
aws ssm put-parameter --name "$NAME_PREFIX/favro/collectionId" --type "String" --value "$FAVRO_COLLECTION"
aws ssm put-parameter --name "$NAME_PREFIX/gitlab/token" --type "SecureString" --value "$GITLAB_TOKEN"
aws ssm put-parameter --name "$NAME_PREFIX/gitlab/rootBranch" --type "String" --value "$GITLAB_ROOT_BRANCH"
aws ssm put-parameter --name "$NAME_PREFIX/gitlab/projectId" --type "String" --value "$GITLAB_PROJECT_ID"
aws ssm put-parameter --name "$NAME_PREFIX/gitlab/url" --type "String" --value "$GITLAB_API_URL"
