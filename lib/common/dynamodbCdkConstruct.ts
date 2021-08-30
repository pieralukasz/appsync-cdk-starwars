import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";

interface DynamodbCdkConstructProps {
  dynamoLambda: lambda.Function;
  envName: string;
  tableName: string;
}

export class DynamodbCdkConstruct extends cdk.Construct {
  public dynamodb: dynamodb.Table;

  constructor(
    scope: cdk.Construct,
    id: string,
    { dynamoLambda, envName, tableName }: DynamodbCdkConstructProps,
  ) {
    super(scope, id);

    this.dynamodb = new dynamodb.Table(this, tableName, {
      tableName,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    this.dynamodb.grantFullAccess(dynamoLambda);
    dynamoLambda.addEnvironment(envName, this.dynamodb.tableName);
  }
}
