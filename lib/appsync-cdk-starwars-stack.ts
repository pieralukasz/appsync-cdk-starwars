import * as cdk from "@aws-cdk/core";
import { AppSyncCdkConstruct } from "./common/appSyncCdkConstruct";
import { APP_NAME } from "../const";

export class AppsyncCdkStarwarsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new AppSyncCdkConstruct(this, `${APP_NAME}-GraphQL`);

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
