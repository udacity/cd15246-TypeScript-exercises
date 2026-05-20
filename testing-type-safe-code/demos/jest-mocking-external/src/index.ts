/**
 * Demonstrates type-safe mocking for external dependencies.
 */

export interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<boolean>;
}

export interface Logger {
  info(message: string): void;
  error(message: string): void;
}

export class NotificationService {
  constructor(
    private emailService: EmailService,
    private logger: Logger
  ) {}

  async sendWelcomeEmail(user: { email: string; name: string }): Promise<boolean> {
    try {
      this.logger.info(`Sending welcome email to ${user.email}`);
      const result = await this.emailService.sendEmail(
        user.email,
        "Welcome!",
        `Hello ${user.name}, welcome to our platform!`
      );
      if (result) {
        this.logger.info(`Welcome email sent to ${user.email}`);
      }
      return result;
    } catch (err) {
      this.logger.error(`Failed to send email to ${user.email}`);
      return false;
    }
  }
}
