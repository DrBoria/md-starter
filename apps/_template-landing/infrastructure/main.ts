import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsContainerApp as DeploymentStrategy } from "@md/infrastructure/src/constructs/aws-container";

class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const appName = "TEMPLATE_APP_NAME";

        new DeploymentStrategy(this, "deployment", {
            appName,
            dockerImage: "my-repo/image:latest",
            port: 80
        });
    }
}
