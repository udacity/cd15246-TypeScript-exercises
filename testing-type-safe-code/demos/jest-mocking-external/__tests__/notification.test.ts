import { NotificationService, EmailService, Logger } from "../src/index";

describe("NotificationService", () => {
  let mockEmailService: jest.Mocked<EmailService>;
  let mockLogger: jest.Mocked<Logger>;
  let service: NotificationService;

  beforeEach(() => {
    mockEmailService = {
      sendEmail: jest.fn(),
    } as jest.Mocked<EmailService>;
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    } as jest.Mocked<Logger>;
    service = new NotificationService(mockEmailService, mockLogger);
  });

  it("should send welcome email successfully", async () => {
    mockEmailService.sendEmail.mockResolvedValue(true);

    const result = await service.sendWelcomeEmail({
      email: "alice@test.com",
      name: "Alice",
    });

    expect(result).toBe(true);
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
      "alice@test.com",
      "Welcome!",
      "Hello Alice, welcome to our platform!"
    );
    expect(mockLogger.info).toHaveBeenCalledTimes(2);
  });

  it("should handle email service failure", async () => {
    mockEmailService.sendEmail.mockResolvedValue(false);

    const result = await service.sendWelcomeEmail({
      email: "bob@test.com",
      name: "Bob",
    });

    expect(result).toBe(false);
  });

  it("should handle email service throwing error", async () => {
    mockEmailService.sendEmail.mockRejectedValue(new Error("Connection failed"));

    const result = await service.sendWelcomeEmail({
      email: "error@test.com",
      name: "Error",
    });

    expect(result).toBe(false);
    expect(mockLogger.error).toHaveBeenCalled();
  });
});
