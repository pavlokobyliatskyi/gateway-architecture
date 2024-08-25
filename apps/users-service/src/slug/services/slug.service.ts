import { Injectable } from '@nestjs/common';
import slug from 'slug';

@Injectable()
export class SlugService {
  slug(text: string, separator = '-') {
    if (!text) {
      throw new Error('The text cannot be empty.');
    }

    if (typeof text !== 'string') {
      throw new Error('The text must be a string.');
    }

    return slug(text, separator);
  }
}
