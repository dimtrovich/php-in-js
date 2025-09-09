/**
 * Converts a packed internet address to a human readable representation
 * @param a - A 32bit IPv4, or 128bit IPv6 address
 * @returns A string representation of the address or false on failure
 */
export function inet_ntop(a: string): string | boolean;

/**
 * Converts a human readable IP address to its packed in_addr representation
 * @param a - A human readable IPv4 or IPv6 address
 * @returns The in_addr representation of the given address or false on failure
 */
export function inet_pton(a: string): string | boolean;

/**
 * Converts a string containing an (IPv4) Internet Protocol dotted address into a long integer
 * @param IP - A standard format address
 * @returns The long integer or false if IP could not be converted
 */
export function ip2long(IP: string): number | boolean;

/**
 * Converts an long integer address into a string in (IPv4) Internet standard dotted format
 * @param ip - A proper address representation in long integer
 * @returns The Internet IP address as a string
 */
export function long2ip(ip: number): string | boolean;

/**
 * Send a cookie
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param expires - The time the cookie expires
 * @param path - The path on the server in which the cookie will be available on
 * @param domain - The (sub)domain that the cookie is available to
 * @param secure - Indicates that the cookie should only be transmitted over a secure HTTPS connection
 * @returns True on success, false on failure
 */
export function setcookie(name: string, value: string, expires?: number | string | Date, path?: string, domain?: string, secure?: boolean): boolean;

/**
 * Send a cookie without URL-encoding the cookie value
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param expires - The time the cookie expires
 * @param path - The path on the server in which the cookie will be available on
 * @param domain - The (sub)domain that the cookie is available to
 * @param secure - Indicates that the cookie should only be transmitted over a secure HTTPS connection
 * @returns True on success, false on failure
 */
export function setrawcookie(name: string, value: string, expires?: number | string | Date, path?: string, domain?: string, secure?: boolean): boolean;
