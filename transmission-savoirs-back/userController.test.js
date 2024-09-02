const userController = require('./app/controller/api/userController');
const userDataMapper = require('./app/models/user');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const bcrypt = require('bcrypt');
const client = require('./app/config/db');
const { generateAccessToken } = require('./app/utils/jwt-helpers');
const {
  contactEmail,
  mailOptions,
  formMessage,
} = require('./app/utils/nodemailer');

jest.mock('./app/models/user');
jest.mock('bcrypt');
jest.mock('./app/config/db');
jest.mock('./app/utils/jwt-helpers');
jest.mock('./app/utils/nodemailer');

describe('userController.login', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should log in the user and return tokens and user info with status 200', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = {
      id: 1,
      pseudo: 'testuser',
      email: email,
      password: await bcrypt.hash(password, 10),
    };
    req.body = { email, password };

    client.query.mockResolvedValue({ rows: [user] });
    bcrypt.compare.mockResolvedValue(true);
    generateAccessToken.mockReturnValue({ accessToken: 'testToken' });

    await userController.login(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    expect(generateAccessToken).toHaveBeenCalledWith(user);
    expect(res.json).toHaveBeenCalledWith({ user, tokens: { accessToken: 'testToken' } });
  });

  it('should return 401 if user email is not found', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    req.body = { email, password };

    client.query.mockResolvedValue({ rows: [] });

    await userController.login(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email ou mot de passe incorrect.' });
  });

  it('should return 401 if password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = {
      id: 1,
      pseudo: 'testuser',
      email: email,
      password: await bcrypt.hash('differentpassword', 10), 
    };
    req.body = { email, password };

    client.query.mockResolvedValue({ rows: [user] });
    bcrypt.compare.mockResolvedValue(false);

    await userController.login(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith('Email ou mot de passe incorrect.');
  });

  it('should handle errors and return 500 status', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    req.body = { email, password };

    const errorMessage = 'Database error';

    client.query.mockRejectedValue(new Error(errorMessage));

    await userController.login(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.render).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.register', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should register a new user and return tokens and user info with status 200', async () => {
    const userInfo = {
      email: 'newuser@example.com',
      password: 'password123',
      pseudo: 'newuser',
      birthdate: '2000-01-01',
      role_id: 2,
    };
    const newUser = { id: 1, ...userInfo, password: await bcrypt.hash(userInfo.password, 10) };
    const newTokens = { accessToken: 'newToken' };

    req.body = userInfo;

    bcrypt.hash.mockResolvedValue(newUser.password);
    client.query.mockResolvedValue({ rows: [newUser] });
    generateAccessToken.mockReturnValue(newTokens);

    await userController.register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(userInfo.password, 10);
    expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(generateAccessToken).toHaveBeenCalledWith(newUser);
    expect(res.json).toHaveBeenCalledWith({ newTokens, newUser });
  });

  it('should return 404 if the user could not be registered', async () => {
    const userInfo = {
      email: 'newuser@example.com',
      password: 'password123',
      pseudo: 'newuser',
      birthdate: '2000-01-01',
      role_id: 2,
    };
  
    req.body = userInfo;
  
    bcrypt.hash.mockResolvedValue('$2y$10$SOfrXfl5iH.JqGDUp/ZiCeTpfbPVvnMwPo3r3gwZnzbUz5rsI9w/K');
    client.query.mockResolvedValue(null); 
  
    await userController.register(req, res);
  
    expect(bcrypt.hash).toHaveBeenCalledWith(userInfo.password, 10);
    expect(client.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "L'utilisateur·ice n'a pas pu être ajouté·e" });
  });
  

  it('should handle errors and return 500 status', async () => {
    const userInfo = {
      email: 'newuser@example.com',
      password: 'password123',
      pseudo: 'newuser',
      birthdate: '2000-01-01',
      role_id: 2,
    };

    req.body = userInfo;

    const errorMessage = 'Database error';

    bcrypt.hash.mockRejectedValue(new Error(errorMessage));

    await userController.register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(userInfo.password, 10);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(new Error(errorMessage));
  });
});

describe('userController.getUserProfil', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return user profile with status 200', async () => {
    const userId = 1;
    const userProfile = { id: userId, pseudo: 'testuser' };

    req.params.id = userId;
    userDataMapper.getUserProfil.mockResolvedValue(userProfile);

    await userController.getUserProfil(req, res);

    expect(userDataMapper.getUserProfil).toHaveBeenCalledWith(userId);
    expect(res.json).toHaveBeenCalledWith(userProfile);
  });

  it('should return 404 if the user could not be deleted', async () => {
    const userId = 1;
    const user = { id: userId };  

    req.params.id = userId;
    req.user = { id: userId };

    client.query.mockResolvedValue({ rows: [user] });
    userDataMapper.delete.mockResolvedValue(null);

    await userController.delete(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(userDataMapper.delete).toHaveBeenCalledWith(userId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "L'utilisateur·ice n'a pas pu être supprimé·e" });
});


  it('should handle errors and return 500 status', async () => {
    const userId = 1;
    const errorMessage = 'Database error';

    req.params.id = userId;
    userDataMapper.getUserProfil.mockRejectedValue(new Error(errorMessage));

    await userController.getUserProfil(req, res);

    expect(userDataMapper.getUserProfil).toHaveBeenCalledWith(userId);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.delete', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should delete a user if found and return it with status 200', async () => {
    const userId = 1;
    const user = { id: userId };

    req.params.id = userId;
    req.user = { id: userId };

    client.query.mockResolvedValue({ rows: [user] });
    userDataMapper.delete.mockResolvedValue(user);

    await userController.delete(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(userDataMapper.delete).toHaveBeenCalledWith(userId);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('should return 404 if the user could not be deleted', async () => {
    const userId = 1;
    const user = { id: userId };  
  
    req.params.id = userId;
    req.user = { id: userId };

    client.query.mockResolvedValue({ rows: [user] });
    userDataMapper.delete.mockResolvedValue(null);

    await userController.delete(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(userDataMapper.delete).toHaveBeenCalledWith(userId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ status: "L'utilisateur·ice n'a pas pu être supprimé·e" });
  });

  it('should return 401 if the user is not authorized to delete the user', async () => {
    const userId = 1;

    req.params.id = userId;
    req.user = { id: userId };

    client.query.mockResolvedValue({ rows: [] });

    await userController.delete(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Vous n'êtes pas autorisé à supprimer cet utilisateur·ice." });
  });

  it('should handle errors and return 500 status', async () => {
    const userId = 1;
    const errorMessage = 'Database error';

    req.params.id = userId;
    req.user = { id: userId };

    client.query.mockRejectedValue(new Error(errorMessage));

    await userController.delete(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.resetPassword', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should send a password reset email if user is found', async () => {
    const email = 'test@example.com';
    const user = { id: 1, email: email };
  
    req.body.email = email;
  
    client.query.mockResolvedValue({ rows: [user] });
    generateAccessToken.mockReturnValue({ accessToken: 'resetToken' });
  
    contactEmail.sendMail.mockImplementation((options, callback) => callback(null));
  
    await userController.resetPassword(req, res);
  
    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(generateAccessToken).toHaveBeenCalledWith(user);
    expect(contactEmail.sendMail).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Un email contenant les instructions pour réinitialiser votre mot de passe vous a été envoyé.",
    });
  });
  

  it('should return 404 if user email is not found', async () => {
    const email = 'test@example.com';
  
    req.body.email = email;
  
    client.query.mockResolvedValue({ rowCount: 0, rows: [] });
  
    await userController.resetPassword(req, res);
  
    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nous n'avons trouvé aucun·e utilisateur·ice avec cet email.",
    });
  });


  it('should handle errors and return 500 status', async () => {
    const email = 'test@example.com';
    const errorMessage = 'Database error';

    req.body.email = email;

    client.query.mockRejectedValue(new Error(errorMessage));

    await userController.resetPassword(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.setNewPassword', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should update the user password and return status 200', async () => {
    const email = 'test@example.com';
    const newPassword = 'newpassword123';

    req.user = { email };
    req.body.password = newPassword;

    bcrypt.hash.mockResolvedValue('hashedpassword');
    client.query.mockResolvedValue({});

    await userController.setNewPassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email, 'hashedpassword']);
    expect(res.json).toHaveBeenCalledWith({ message: "Votre mot de passe vient d'être modifié." });
  });

  it('should return 404 if the password could not be updated', async () => {
    const email = 'test@example.com';
    const newPassword = 'newpassword123';

    req.user = { email };
    req.body.password = newPassword;

    bcrypt.hash.mockResolvedValue('hashedpassword');
    client.query.mockResolvedValue(null);

    await userController.setNewPassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
    expect(client.query).toHaveBeenCalledWith(expect.any(String), [email, 'hashedpassword']);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Votre mot de passe n'a pas pu être modifié.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const email = 'test@example.com';
    const newPassword = 'newpassword123';
    const errorMessage = 'Database error';

    req.user = { email };
    req.body.password = newPassword;

    bcrypt.hash.mockRejectedValue(new Error(errorMessage));

    await userController.setNewPassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.getAllUsers', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return all users with status 200', async () => {
    const users = [{ id: 1, pseudo: 'user1' }, { id: 2, pseudo: 'user2' }];
    userDataMapper.getAllUsers.mockResolvedValue(users);

    await userController.getAllUsers(req, res);

    expect(userDataMapper.getAllUsers).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('should return 404 if no users are found', async () => {
    userDataMapper.getAllUsers.mockResolvedValue(null);

    await userController.getAllUsers(req, res);

    expect(userDataMapper.getAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Nous n'avons trouvé aucun profil d'utilisateur·ice.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const errorMessage = 'Database error';

    userDataMapper.getAllUsers.mockRejectedValue(new Error(errorMessage));

    await userController.getAllUsers(req, res);

    expect(userDataMapper.getAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.edit', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should edit a user if found and return it with status 200', async () => {
    const userId = 1;
    const updatedUser = { id: userId, pseudo: 'updateduser' };

    req.params.id = userId;
    req.user = { id: userId };
    req.body = { pseudo: 'updateduser' };

    client.query.mockResolvedValue({ rows: [{ id: userId }] });
    userDataMapper.edit.mockResolvedValue(updatedUser);

    await userController.edit(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(userDataMapper.edit).toHaveBeenCalledWith(userId, req.body);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  it('should return 404 if the user could not be edited', async () => {
    const userId = 1;

    req.params.id = userId;
    req.user = { id: userId };
    req.body = { pseudo: 'updateduser' };

    client.query.mockResolvedValue({ rows: [{ id: userId }] });
    userDataMapper.edit.mockResolvedValue(null);

    await userController.edit(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(userDataMapper.edit).toHaveBeenCalledWith(userId, req.body);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Votre utilisateur·ice n'a pas été modifié·e.",
    });
  });

  it('should return 401 if the user is not authorized to edit the user', async () => {
    const userId = 1;

    req.params.id = userId;
    req.user = { id: userId };
    req.body = { pseudo: 'updateduser' };

    client.query.mockResolvedValue({ rows: [] });

    await userController.edit(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Vous n'êtes pas autorisé à modifier le profil de cet utilisateur·ice.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const userId = 1;
    const errorMessage = 'Database error';

    req.params.id = userId;
    req.user = { id: userId };
    req.body = { pseudo: 'updateduser' };

    client.query.mockRejectedValue(new Error(errorMessage));

    await userController.edit(req, res);

    expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.contactForm', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should send a contact form email and return a success message', async () => {
    const formData = { name: 'Test User', email: 'test@example.com', message: 'Hello' };
    req.body = formData;

    contactEmail.sendMail.mockImplementation((options, callback) => callback(null));

    await userController.contactForm(req, res);

    expect(contactEmail.sendMail).toHaveBeenCalledWith(formMessage(formData), expect.any(Function));
    expect(res.json).toHaveBeenCalledWith({
      status: "Merci. Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais.",
    });
  });

  it('should return an error message if the email fails to send', async () => {
    const formData = { name: 'Test User', email: 'test@example.com', message: 'Hello' };
    req.body = formData;

    contactEmail.sendMail.mockImplementation((options, callback) => callback(new Error('Email service error')));

    await userController.contactForm(req, res);

    expect(contactEmail.sendMail).toHaveBeenCalledWith(formMessage(formData), expect.any(Function));
    expect(res.json).toHaveBeenCalledWith({
      status: "Désolé test le service est inactif pour le moment. Merci de ressayer dans quelques minutes.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const formData = { name: 'Test User', email: 'test@example.com', message: 'Hello' };
    req.body = formData;
    const errorMessage = 'Unexpected error';

    contactEmail.sendMail.mockImplementation(() => { throw new Error(errorMessage); });

    await userController.contactForm(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});

describe('userController.getAllAvatars', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return all avatars with status 200', async () => {
    const avatars = [{ id: 1, name: 'Avatar 1' }, { id: 2, name: 'Avatar 2' }];
    userDataMapper.getAllAvatars.mockResolvedValue(avatars);

    await userController.getAllAvatars(req, res);

    expect(userDataMapper.getAllAvatars).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(avatars);
  });

  it('should return 404 if no avatars are found', async () => {
    userDataMapper.getAllAvatars.mockResolvedValue(null);

    await userController.getAllAvatars(req, res);

    expect(userDataMapper.getAllAvatars).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Pas d'avatars disponibles." });
  });

  it('should handle errors and return 500 status', async () => {
    const errorMessage = 'Database error';

    userDataMapper.getAllAvatars.mockRejectedValue(new Error(errorMessage));

    await userController.getAllAvatars(req, res);

    expect(userDataMapper.getAllAvatars).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});
