import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";

import { DynamodbCdkConstruct } from "../common/dynamodbCdkConstruct";

import { APP_NAME, DEFAULT_LAMBDA_RUNTIME } from "../../const";
import { Resolver } from "../../types/enums/Resolver";

interface CharacterCdkConstructProps {
  graphQLApi: appsync.GraphqlApi;
}

export class CharacterCdkConstruct extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    { graphQLApi }: CharacterCdkConstructProps,
  ) {
    super(scope, id);

    const characterLambda = new lambda.Function(
      this,
      `${APP_NAME}-CharacterManagementLambda`,
      {
        runtime: DEFAULT_LAMBDA_RUNTIME,
        handler: "characterLambda.handler",
        code: lambda.Code.fromAsset("lib/character/resolvers"),
        memorySize: 1024,
      },
    );

    const characterLambdaDataSource = graphQLApi.addLambdaDataSource(
      `${APP_NAME}CharacterLambdaDataSource`,
      characterLambda,
    );

    characterLambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: Resolver.GET_CHARACTER_BY_ID,
    });

    characterLambdaDataSource.createResolver({
      typeName: "Query",
      fieldName: Resolver.GET_ALL_CHARACTERS,
    });

    characterLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: Resolver.CREATE_CHARACTER,
    });

    characterLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: Resolver.UPDATE_CHARACTER,
    });

    characterLambdaDataSource.createResolver({
      typeName: "Mutation",
      fieldName: Resolver.DELETE_CHARACTER,
    });

    new DynamodbCdkConstruct(this, `${APP_NAME}-DynamoCharacterTable`, {
      dynamoLambda: characterLambda,
      envName: "CHARACTER_TABLE",
      tableName: `${APP_NAME}-DynamoCharacterTable`,
    });

    new DynamodbCdkConstruct(this, `${APP_NAME}-DynamoPlanetTable`, {
      dynamoLambda: characterLambda,
      envName: "PLANET_TABLE",
      tableName: `${APP_NAME}-DynamoPlanetTable`,
    });

    new DynamodbCdkConstruct(this, `${APP_NAME}-DynamoEpisodeTable`, {
      dynamoLambda: characterLambda,
      envName: "EPISODE_TABLE",
      tableName: `${APP_NAME}-DynamoEpisodeTable`,
    });
  }
}
