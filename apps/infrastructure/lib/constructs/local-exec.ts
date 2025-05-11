import { Construct } from "constructs";
import { TerraformResource, ITerraformDependable } from "cdktf";

export interface LocalExecProps {
  /**
   * Command to execute
   */
  command: string;
  /**
   * Working directory to execute the command in
   */
  workingDir?: string;
  /**
   * Map of environment variables to pass to the command
   */
  environment?: { [key: string]: string };
  /**
   * When to execute the command
   */
  triggers?: { [key: string]: string };
  /**
   * A list of resources that this LocalExec depends on.
   * The command will only run after these resources are created/updated.
   * Pass resource attributes (e.g., bucket.arn, policy.id) to ensure re-triggering on change.
   */
  dependsOnResources?: { [key: string]: any };
}

/**
 * Execute a command locally during the apply phase
 */
export class LocalExec extends TerraformResource {
  constructor(scope: Construct, id: string, props: LocalExecProps) {
    super(scope, id, {
      terraformResourceType: "null_resource",
      terraformGeneratorMetadata: {
        providerName: "null",
        providerVersion: "~> 3.0",
        providerVersionConstraint: "~> 3.0"
      },
    });

    const commandToExecute = props.workingDir
      ? `cd ${props.workingDir} && ${props.command}`
      : props.command;

    const environmentVariables = props.environment || {};
    // Combine explicit triggers with dependency-based triggers
    const combinedTriggers = { ...props.triggers };
    if (props.dependsOnResources) {
      for (const key in props.dependsOnResources) {
        combinedTriggers[`dep_${key}`] = props.dependsOnResources[key];
      }
    }

    this.addOverride("provisioner", [
      {
        "local-exec": {
          command: commandToExecute,
          environment: environmentVariables,
        },
      },
    ]);

    if (Object.keys(combinedTriggers).length > 0) {
      this.addOverride("triggers", combinedTriggers);
    }
  }
} 
