#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AppsyncCdkStarwarsStack } from "../lib/appsync-cdk-starwars-stack";

const app = new cdk.App();

new AppsyncCdkStarwarsStack(app, "AppsyncCdkStarwarsStack", {});
