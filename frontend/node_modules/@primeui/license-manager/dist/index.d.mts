/**
 * SKU (tier) and usage model (type) on each license token. Two orthogonal
 * fields on the store side:
 *
 * - `tier` answers "which SKU?": `community` (free) or `commercial` (paid).
 *   Only present on `product: 'primeui'` tokens; absent on PRO tokens.
 * - `type` answers "what usage?": `dev` (per-seat, perpetual), `oem`
 *   (redistribution, annual), or `site` (uncapped org, annual).
 */
type LicenseTier = 'community' | 'commercial';
type LicenseType = 'dev' | 'oem' | 'site';
type LicenseStatus = 'active' | 'grace' | 'expired' | 'invalid' | 'wrong-product' | 'tampered' | 'unconfigured' | 'missing';
/**
 * Short names customers use when configuring licenses. Each maps to a full
 * product identifier via `PRODUCT_MAP`.
 */
type LicenseShortName = 'primeui' | 'scheduler' | 'texteditor' | 'charts' | 'diagram' | 'pdfviewer' | 'taskboard' | 'datagrid' | 'ganttchart' | 'filemanager';
/**
 * Config the customer passes once at app bootstrap. Each entry holds one
 * license token. When a PRO component request is made and the specific PRO
 * key is missing, the registry falls back to `keys.primeui` — the verifier's
 * bundle rule then accepts that token if its `tier` is `'commercial'`.
 */
type LicenseKeys = Partial<Record<LicenseShortName, string>>;
interface LicensePayload {
    /** License key UUID from the store database. */
    id: string;
    /** Product identifier — 'primeui' or 'primeui-pro:<component>'. */
    product: string;
    /** SKU on primeui products: community or commercial. Absent on PRO tokens. */
    tier?: LicenseTier;
    /** Usage model: dev (per-seat perpetual), oem (redistribution, annual), or site (uncapped org, annual). */
    type: LicenseType;
    /** Issued-at unix seconds. */
    iat: number;
    /** Expiry unix seconds — matches update_ends_at. */
    exp: number;
}
interface VerifyOptions {
    /** The product this caller expects — e.g. 'primeui' or 'primeui-pro:scheduler'. */
    product: string;
    /** Display name used in the returned `message` — defaults to 'PrimeUI'. */
    productLabel?: string;
    /**
     * Release date of the package performing the check. ISO string ('2026-04-23')
     * or unix seconds. Tokens whose `exp` is older than this date are rejected,
     * which is how perpetual licenses are enforced: new versions released after
     * the updates window aren't covered.
     */
    releaseDate?: string | number;
    /** Grace period in days after exp. Defaults to 30. Applies to Community only. */
    graceDays?: number;
    /** Override the embedded public key for dev/test builds. */
    publicKeyOverride?: string;
}
interface VerifyResult {
    /** true when status is 'active' or 'grace'. */
    valid: boolean;
    status: LicenseStatus;
    /** Human-readable message suitable for display in a banner or console.warn. */
    message: string;
    /** Days until exp, can be negative if past exp. Only set when payload decoded. */
    daysUntilExpiry?: number;
    /** Decoded payload, only when signature verified. */
    payload?: LicensePayload;
}
/**
 * Optional second argument to {@link registerLicense} / `createLicenseService`.
 * Dev/test escape hatches; production callers leave it off.
 */
interface LicenseConfig {
    /** Override grace period in days (default 30). */
    graceDays?: number;
    /** Override the embedded public key for dev/test builds. */
    publicKeyOverride?: string;
}
interface LicenseVerifyOptions {
    /** Release date of the calling package. ISO string or unix seconds. */
    releaseDate?: string | number;
}
/**
 * The thing PRO components and Prime libraries consume. Resolved either via
 * {@link getLicenseService} (after a host called {@link registerLicense}) or
 * built ad-hoc with {@link createLicenseService}.
 */
interface LicenseService {
    /**
     * Verify the license for a given short product name (e.g. 'texteditor').
     * Falls back to `keys.primeui` for PRO components when the specific PRO key
     * is missing — the verifier's bundle rule accepts a Commercial / OEM
     * PrimeUI token for any PRO component request. Pass the calling package's
     * `releaseDate` so perpetual licenses are enforced against version dates,
     * not wall-clock time.
     */
    verify(short: LicenseShortName, options?: LicenseVerifyOptions): Promise<VerifyResult>;
    /** Whether any key is configured for this product (exact OR primeui bundle fallback). */
    has(short: LicenseShortName): boolean;
}

declare function verify(token: string, options: VerifyOptions): Promise<VerifyResult>;

/**
 * Build a framework-agnostic license service from a keys object. Used by
 * {@link registerLicense} for the process-global registry, and exported
 * directly for hosts that want to manage their own service instance (e.g. a
 * Prime library that scopes licenses to its own provider).
 *
 * `config` is optional and only used for dev/test overrides.
 */
declare function createLicenseService(keys: LicenseKeys, config?: LicenseConfig): LicenseService;

/**
 * Register license keys with the process-global registry. Typically called by
 * a host Prime library's installer (PrimeVue plugin, `providePrimeNG`,
 * `<PrimeReactProvider>`), or directly by standalone PRO consumers before any
 * licensed component mounts.
 *
 * ```ts
 * registerLicense({
 *     primeui: 'PrimeUI-Commercial-key...',
 *     texteditor: 'PrimeUI-PRO-TextEditor-key...'
 * });
 * ```
 *
 * Multiple calls overwrite — last call wins. Idempotent re-registration with
 * the same keys (the common SSR / HMR case) is a no-op as far as consumers see.
 *
 * `config` is optional and only used for dev/test overrides.
 */
declare function registerLicense(keys: LicenseKeys, config?: LicenseConfig): LicenseService;
/**
 * Retrieve the registered license service. Returns `null` when no host has
 * called {@link registerLicense} yet — consumers should treat that as the
 * `unconfigured` status.
 */
declare function getLicenseService(): LicenseService | null;
/**
 * Verify a short product name against the global registry. Returns the
 * `unconfigured` status if {@link registerLicense} has not been called.
 *
 * This is the entry point PRO components call at mount time:
 *
 * ```ts
 * const result = await verifyLicense('scheduler', { releaseDate: __BUILD_DATE__ });
 * if (!result.valid) showWatermark(result);
 * ```
 */
declare function verifyLicense(short: LicenseShortName, options?: LicenseVerifyOptions): Promise<VerifyResult>;

/**
 * Grace period, in days, that extends past `exp`. Within this window the
 * verifier returns status `grace` — library still works, but callers should
 * surface a warning in the UI.
 */
declare const GRACE_DAYS = 30;
/** Canonical product identifier for the PrimeUI core libraries. */
declare const PRIMEUI_PRODUCT = "primeui";
/** Prefix for individual PRO component product identifiers. */
declare const PRIMEUI_PRO_PREFIX = "primeui-pro:";
/**
 * Maps each customer-facing short key to the canonical product identifier
 * embedded in signed license tokens. Framework adapters look here.
 */
declare const PRODUCT_MAP: {
    readonly primeui: "primeui";
    readonly scheduler: "primeui-pro:scheduler";
    readonly texteditor: "primeui-pro:text-editor";
    readonly charts: "primeui-pro:charts";
    readonly diagram: "primeui-pro:diagram";
    readonly pdfviewer: "primeui-pro:pdf-viewer";
    readonly taskboard: "primeui-pro:task-board";
    readonly datagrid: "primeui-pro:datagrid";
    readonly ganttchart: "primeui-pro:gantt-chart";
    readonly filemanager: "primeui-pro:file-manager";
};

/**
 * Human-readable display name for each short name. Adapters use this to feed
 * `productLabel` into the core verifier so the returned `message` is pretty.
 */
declare const SHORT_NAME_LABELS: Record<LicenseShortName, string>;
/**
 * Produce a standard human-readable message for a license status. Consumers
 * don't usually call this — it's applied automatically to every `VerifyResult`.
 */
declare function formatLicenseMessage(status: LicenseStatus, productLabel?: string): string;

export { GRACE_DAYS, type LicenseConfig, type LicenseKeys, type LicensePayload, type LicenseService, type LicenseShortName, type LicenseStatus, type LicenseTier, type LicenseType, type LicenseVerifyOptions, PRIMEUI_PRODUCT, PRIMEUI_PRO_PREFIX, PRODUCT_MAP, SHORT_NAME_LABELS, type VerifyOptions, type VerifyResult, createLicenseService, formatLicenseMessage, getLicenseService, registerLicense, verify, verifyLicense };
