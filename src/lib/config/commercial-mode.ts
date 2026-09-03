export const deploymentModes = ["PRE_LAUNCH", "COMMERCIAL"] as const;

export type DeploymentMode = (typeof deploymentModes)[number];

type Environment = Readonly<Record<string, string | undefined>>;

export function getDeploymentMode(
  environment: Environment = process.env,
): DeploymentMode {
  const configuredMode = environment.OMNIARB_MODE?.trim();

  if (!configuredMode) {
    return "PRE_LAUNCH";
  }

  if (deploymentModes.includes(configuredMode as DeploymentMode)) {
    return configuredMode as DeploymentMode;
  }

  throw new Error("OMNIARB_MODE must be PRE_LAUNCH or COMMERCIAL");
}

export function isCommercialMode(environment?: Environment): boolean {
  return getDeploymentMode(environment) === "COMMERCIAL";
}
