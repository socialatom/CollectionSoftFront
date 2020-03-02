#!/bin/bash

USERNAME="teststaffadmin@test.com"
PASSWORD="Pass123!"
TESTPATH="/staffAdminDeleteStaffUser"
METHOD="POST"

UserPoolId="eu-central-1_Ry0V9yzPQ"
IdentityPoolId="eu-central-1:4c0bb00a-3f7b-4c8b-a04b-243f4ba181b7"
UserPoolClientId="16arjbh7du376ht1bja2t9ka3g"
ServiceEndpoint="https://api.astorgacollections.com/prod"
Region="eu-central-1"
STAFFPROFILEID="c580d3c5-cb9c-4b70-8ad5-4b6afe4303f8"
BODY="{\"staffProfileId\":\"$STAFFPROFILEID\"}"
echo "Running Test: Testing Path $TESTPATH Method $METHOD with $BODY"

set -o xtrace
apig-test \
--username="$USERNAME" \
--password="$PASSWORD" \
--user-pool-id="$UserPoolId" \
--app-client-id="$UserPoolClientId" \
--cognito-region="$Region" \
--identity-pool-id="$IdentityPoolId" \
--invoke-url="$ServiceEndpoint" \
--api-gateway-region="$Region" \
--path-template="$TESTPATH" \
--method="$METHOD" \
--body="$BODY"