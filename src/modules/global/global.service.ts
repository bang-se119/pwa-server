import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  checkStatus(): string {
    return 'Server start successfully 🚀';
  }
}
