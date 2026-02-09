import type { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsFargateApp as DeploymentStrategy } from "@md/infrastructure";

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

const app = new App();
new MyStack(app, "template-landing");
app.synth();
