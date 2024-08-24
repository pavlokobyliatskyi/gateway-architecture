import { Injectable } from '@nestjs/common';
import slug from 'slug';

@Injectable()
export class SlugService {
  slug(text: string, separator = '-') {
    return slug(text, separator);
  }
}
