import { describe, expect, it } from "vitest";
import { mapping } from "@/utility/units";

describe("crypto gauge mapping", () => {
	it("should map -1.00 to 0.00", () => {
		const result = mapping(-1);
		expect(result).toBe(0);
	});

	it("should map -0.50 to 0.25", () => {
		const result = mapping(-0.5);
		expect(result).toBe(0.25);
	});

	it("should map 0.00 to 0.50", () => {
		const result = mapping(0);
		expect(result).toBe(0.5);
	});

	it("should map 0.50 to 0.75", () => {
		const result = mapping(0.5);
		expect(result).toBe(0.75);
	});

	it("should map 1.00 to 1.00", () => {
		const result = mapping(1);
		expect(result).toBe(1);
	});
});
