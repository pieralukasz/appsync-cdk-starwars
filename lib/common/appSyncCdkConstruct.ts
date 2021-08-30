import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";

import { CharacterCdkConstruct } from "../character/characterCdkConstruct";
import { APP_NAME } from "../../const";

export class AppSyncCdkConstruct extends cdk.Construct {
  public api: appsync.GraphqlApi;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
    this.api = new appsync.GraphqlApi(this, `${APP_NAME}-GraphQL`, {
      name: `${APP_NAME}-GraphQL`,
      schema: appsync.Schema.fromAsset("lib/common/root.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      logConfig: {
        excludeVerboseContent: false,
        fieldLogLevel: appsync.FieldLogLevel.ERROR,
      },
      xrayEnabled: true,
    });

    new CharacterCdkConstruct(this, `${APP_NAME}-Character`, {
      graphQLApi: this.api,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: this.api.graphqlUrl,
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: this.api.apiKey || "",
    });
  }
}
