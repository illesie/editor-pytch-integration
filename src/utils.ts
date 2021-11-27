export const withinApp = (url: string) => {
  return url[0] === "/" ? process.env.PUBLIC_URL + url : url;
};

/** Makes the given URL be within the main site.  This is to allow
 * deployments other than to the root of the domain.  The environment
 * variable REACT_APP_DEPLOY_BASE_URL gives the site's base URL. */
export const withinSite = (url: string) => {
  return process.env.REACT_APP_DEPLOY_BASE_URL + url;
};

export const delaySeconds = (seconds: number) => {
  const timeoutMs = PYTCH_CYPRESS()["instantDelays"] ? 0 : 1000.0 * seconds;
  return new Promise((r) => setTimeout(r, timeoutMs));
};

export const ancestorHavingClass = (elt: HTMLElement, className: string) => {
  while (!elt.classList.contains(className)) {
    const parent = failIfNull(
      elt.parentElement,
      `no parent while looking for ${className}`
    );
    elt = parent;
  }
  return elt;
};

// To allow testing to hook into various aspects of behaviour:
const PYTCH_CYPRESS_default = {
  instantDelays: false,
  inhibitNewTabLinks: false,
};
export const PYTCH_CYPRESS = () => {
  if ((window as any)["PYTCH_CYPRESS"] == null) {
    (window as any)["PYTCH_CYPRESS"] = PYTCH_CYPRESS_default;
  }
  return (window as any)["PYTCH_CYPRESS"];
};

export function getPropertyByPath(target: any, pathStr: string) {
  const path = pathStr.split(".");
  return path.reduce((acc, cur) => acc[cur] ?? {}, target);
}

export const failIfNull = function <T>(
  maybeX: T | null | undefined,
  errorIfNull: string
): T {
  if (maybeX == null) throw Error(errorIfNull);
  return maybeX;
};

// For exhaustiveness checking, as per TypeScript Handbook.
export const assertNever = (x: never): never => {
  throw Error(`should not be here; got ${x}`);
};

export function focusOrBlurFun<Elt extends HTMLElement>(
  elementRef: React.RefObject<Elt>,
  isActive: boolean,
  isInteractable: boolean
) {
  if (!isActive) return () => {};

  const element = () =>
    failIfNull(elementRef.current, "isActive but elementRef null");

  return isInteractable ? () => element().focus() : () => element().blur();
}

export const readArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => resolve(fr.result as ArrayBuffer);
    fr.readAsArrayBuffer(file);
  });
};

// Convert (eg) ProgressUpdate error for unreadable file into something
// a bit more human-friendly:
export const simpleReadArrayBuffer = async (file: File) => {
  try {
    return await readArrayBuffer(file);
  } catch (e) {
    throw new Error("problem reading file");
  }
};
