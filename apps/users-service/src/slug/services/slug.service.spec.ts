import { Test, TestingModule } from '@nestjs/testing';

import { SlugService } from './slug.service';

describe('SlugService', () => {
  let service: SlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlugService],
    }).compile();

    service = module.get<SlugService>(SlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('slug', () => {
    it('should generate a slug with default separator', () => {
      const text = 'Hello World!';
      const expectedSlug = 'hello-world';
      expect(service.slug(text)).toBe(expectedSlug);
    });

    it('should generate a slug with custom separator', () => {
      const text = 'Hello World!';
      const separator = '_';
      const expectedSlug = 'hello_world';
      expect(service.slug(text, separator)).toBe(expectedSlug);
    });

    it('should handle empty string', () => {
      const text = '';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => service.slug(text)).toThrowError(
        'The text cannot be empty.'
      );
    });

    it('should handle null or undefined input', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => service.slug(null)).toThrowError(
        'The text cannot be empty.'
      );
      expect(() => service.slug(undefined)).toThrow();
    });

    it('should throw an error for non-string input', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => service.slug(123)).toThrowError(
        'The text must be a string.'
      );
    });

    it('should handle special characters', () => {
      const text = 'Hello, World!';
      const expectedSlug = 'hello-world';
      expect(service.slug(text)).toBe(expectedSlug);
    });

    it('should handle non-ASCII characters', () => {
      const text = '¡Hola, Mundo!';
      const expectedSlug = 'hola-mundo';
      expect(service.slug(text)).toBe(expectedSlug);
    });
  });
});
