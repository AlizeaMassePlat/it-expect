const adController = require('./app/controller/api/adController');
const adDataMapper = require('./app/models/ad');
const client = require('./app/config/db'); 
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('./app/models/ad');
jest.mock('./app/config/db'); 

describe('adController.getAll', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return all ads with status 200', async () => {
    const ads = [{ id: 1, title: 'Test Ad' }];

    adDataMapper.getAll.mockResolvedValue(ads);

    await adController.getAll(req, res);

    expect(adDataMapper.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(ads);
  });

  it('should return 404 if no ads found', async () => {
    adDataMapper.getAll.mockResolvedValue(null);

    await adController.getAll(req, res);

    expect(adDataMapper.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Nous n'avons trouvé aucune annonce.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const errorMessage = 'Database error';
    adDataMapper.getAll.mockRejectedValue(new Error(errorMessage));
  
    await adController.getAll(req, res);
  
    expect(adDataMapper.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
  
});


// GetAllByCategory 

describe('adController.getAllByCategory', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should return all ads for a category with status 200', async () => {
      const category_id = 1;
      const adsByCategory = [{ id: 1, title: 'Test Ad 1' }, { id: 2, title: 'Test Ad 2' }];
      
      req.params.category_id = category_id;
      adDataMapper.getAllByCategory.mockResolvedValue(adsByCategory);
  
      await adController.getAllByCategory(req, res);
  
      expect(adDataMapper.getAllByCategory).toHaveBeenCalledWith(category_id);
      expect(res.json).toHaveBeenCalledWith(adsByCategory);
    });
  
    it('should return 404 if no ads found for a category', async () => {
      const category_id = 1;
      
      req.params.category_id = category_id;
      adDataMapper.getAllByCategory.mockResolvedValue(null);
  
      await adController.getAllByCategory(req, res);
  
      expect(adDataMapper.getAllByCategory).toHaveBeenCalledWith(category_id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Nous n'avons trouvé aucune annonce pour cette catégorie.",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const category_id = 1;
      const errorMessage = 'Database error';
  
      req.params.category_id = category_id;
      adDataMapper.getAllByCategory.mockRejectedValue(new Error(errorMessage));
  
      await adController.getAllByCategory(req, res);
  
      expect(adDataMapper.getAllByCategory).toHaveBeenCalledWith(category_id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });

  // GetUserAds

  describe('adController.getUserAds', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should return all ads for a user with status 200', async () => {
      const user_id = 1;
      const userAds = [{ id: 1, title: 'Test Ad 1' }, { id: 2, title: 'Test Ad 2' }];
      
      req.params.user_id = user_id;
      adDataMapper.getAllByUser.mockResolvedValue(userAds);
  
      await adController.getUserAds(req, res);
  
      expect(adDataMapper.getAllByUser).toHaveBeenCalledWith(user_id);
      expect(res.json).toHaveBeenCalledWith(userAds);
    });
  
    it('should return 404 if no ads found for a user', async () => {
      const user_id = 1;
      
      req.params.user_id = user_id;
      adDataMapper.getAllByUser.mockResolvedValue(null);
  
      await adController.getUserAds(req, res);
  
      expect(adDataMapper.getAllByUser).toHaveBeenCalledWith(user_id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Nous n'avons trouvé aucune annonce pour cet·te utilisateur·ice.",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const user_id = 1;
      const errorMessage = 'Database error';
  
      req.params.user_id = user_id;
      adDataMapper.getAllByUser.mockRejectedValue(new Error(errorMessage));
  
      await adController.getUserAds(req, res);
  
      expect(adDataMapper.getAllByUser).toHaveBeenCalledWith(user_id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });

  // GetAllByUser

describe('adController.getAllByUser', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return all ads for a user with status 200', async () => {
    const user_id = 1;
    const adsByUser = [{ id: 1, title: 'Test Ad 1' }, { id: 2, title: 'Test Ad 2' }];
    
    req.params.user_id = user_id;
    adDataMapper.getAllByUser.mockResolvedValue(adsByUser);

    await adController.getAllByUser(req, res);

    expect(adDataMapper.getAllByUser).toHaveBeenCalledWith(user_id);
    expect(res.json).toHaveBeenCalledWith(adsByUser);
  });

  it('should return 404 if no ads found for a user', async () => {
    const user_id = 1;
    
    req.params.user_id = user_id;
    adDataMapper.getAllByUser.mockResolvedValue(null);

    await adController.getAllByUser(req, res);

    expect(adDataMapper.getAllByUser).toHaveBeenCalledWith(user_id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Nous n'avons trouvé aucune annonce pour cet·te utilisateur·ice.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const user_id = 1;
    const errorMessage = 'Database error';

    req.params.user_id = user_id;
    adDataMapper.getAllByUser.mockRejectedValue(new Error(errorMessage));

    await adController.getAllByUser(req, res);

    expect(adDataMapper.getAllByUser).toHaveBeenCalledWith(user_id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });
});


// createUserAds

describe('adController.createUserAd', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should create a new ad and return it with status 200', async () => {
      const newAd = { id: 1, title: 'New Test Ad' };
      req.body = { title: 'New Test Ad', userId: 1 };
  
      adDataMapper.createUserAd.mockResolvedValue(newAd);
  
      await adController.createUserAd(req, res);
  
      expect(adDataMapper.createUserAd).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(newAd);
    });
  
    it('should return 404 if the ad could not be created', async () => {
      req.body = { title: 'New Test Ad', userId: 1 };
  
      adDataMapper.createUserAd.mockResolvedValue(null);
  
      await adController.createUserAd(req, res);
  
      expect(adDataMapper.createUserAd).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "L'annonce n'a pas pu être crée",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const errorMessage = 'Database error';
      req.body = { title: 'New Test Ad', userId: 1 };
  
      adDataMapper.createUserAd.mockRejectedValue(new Error(errorMessage));
  
      await adController.createUserAd(req, res);
  
      expect(adDataMapper.createUserAd).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });

  // GetAllByType 


describe('adController.getAllByType', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return all ads for a type with status 200', async () => {
    const type_id = 1;
    const adsByType = [{ id: 1, title: 'Test Ad Type 1' }, { id: 2, title: 'Test Ad Type 2' }];
    
    req.params.type_id = type_id;
    adDataMapper.getAllByType.mockResolvedValue(adsByType);

    await adController.getAllByType(req, res);

    expect(adDataMapper.getAllByType).toHaveBeenCalledWith(type_id);
    expect(res.json).toHaveBeenCalledWith(adsByType);
  });

  it('should return 404 if no ads found for a type', async () => {
    const type_id = 1;
    
    req.params.type_id = type_id;
    adDataMapper.getAllByType.mockResolvedValue(null);

    await adController.getAllByType(req, res);

    expect(adDataMapper.getAllByType).toHaveBeenCalledWith(type_id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Nous n'avons trouvé aucune annonce pour ce type.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const type_id = 1;
    const errorMessage = 'Database error';

    req.params.type_id = type_id;
    adDataMapper.getAllByType.mockRejectedValue(new Error(errorMessage));

    await adController.getAllByType(req, res);

    expect(adDataMapper.getAllByType).toHaveBeenCalledWith(type_id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
});
});

// GetOneWithSimilar
describe('adController.getOneWithSimilar', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should return the ad and similar ads with status 200', async () => {
      const adId = 1;
      const ad = { id: adId, title: 'Test Ad', similar: [{ id: 2, title: 'Similar Ad 1' }] };
  
      req.params.id = adId;
      adDataMapper.getOneWithSimilar.mockResolvedValue(ad);
  
      await adController.getOneWithSimilar(req, res);
  
      expect(adDataMapper.getOneWithSimilar).toHaveBeenCalledWith(adId);
      expect(res.json).toHaveBeenCalledWith(ad);
    });
  
    it('should return 500 if no ad is found', async () => {
      const adId = 1;
  
      req.params.id = adId;
      adDataMapper.getOneWithSimilar.mockResolvedValue(null);
  
      await adController.getOneWithSimilar(req, res);
  
      expect(adDataMapper.getOneWithSimilar).toHaveBeenCalledWith(adId);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Nous n'avons trouvé aucune annonce.",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const adId = 1;
      const errorMessage = 'Database error';
  
      req.params.id = adId;
      adDataMapper.getOneWithSimilar.mockRejectedValue(new Error(errorMessage));
  
      await adController.getOneWithSimilar(req, res);
  
      expect(adDataMapper.getOneWithSimilar).toHaveBeenCalledWith(adId);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });

  describe('adController.getAllByTypeAndCategory', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should return all ads for a type and category with status 200', async () => {
      const type_id = 1;
      const category_id = 2;
      const adsByTypeAndCategory = [{ id: 1, title: 'Ad 1' }, { id: 2, title: 'Ad 2' }];
  
      req.params.type_id = type_id;
      req.params.category_id = category_id;
      adDataMapper.getAllByTypeAndCategory.mockResolvedValue(adsByTypeAndCategory);
  
      await adController.getAllByTypeAndCategory(req, res);
  
      expect(adDataMapper.getAllByTypeAndCategory).toHaveBeenCalledWith(type_id, category_id);
      expect(res.json).toHaveBeenCalledWith(adsByTypeAndCategory);
    });
  
    it('should return 404 if no ads found for type and category', async () => {
      const type_id = 1;
      const category_id = 2;
  
      req.params.type_id = type_id;
      req.params.category_id = category_id;
      adDataMapper.getAllByTypeAndCategory.mockResolvedValue(null);
  
      await adController.getAllByTypeAndCategory(req, res);
  
      expect(adDataMapper.getAllByTypeAndCategory).toHaveBeenCalledWith(type_id, category_id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Nous n'avons trouvé aucune annonce pour ce type et cette catégorie.",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const type_id = 1;
      const category_id = 2;
      const errorMessage = 'Database error';
  
      req.params.type_id = type_id;
      req.params.category_id = category_id;
      adDataMapper.getAllByTypeAndCategory.mockRejectedValue(new Error(errorMessage));
  
      await adController.getAllByTypeAndCategory(req, res);
  
      expect(adDataMapper.getAllByTypeAndCategory).toHaveBeenCalledWith(type_id, category_id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });

  // Delete
  describe('adController.delete', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should delete an ad if found and return it with status 200', async () => {
      const adId = 1;
      const userId = 1;
      const deleteAd = { id: adId, title: 'Deleted Ad' };
  
      req.params.id = adId;
      req.user = { id: userId };
  
      client.query.mockResolvedValue({ rows: [{ id: adId }] });
      adDataMapper.delete.mockResolvedValue(deleteAd);
  
      await adController.delete(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(adDataMapper.delete).toHaveBeenCalledWith(adId);
      expect(res.json).toHaveBeenCalledWith(deleteAd);
    });
  
    it('should return 404 if the ad could not be deleted', async () => {
      const adId = 1;
      const userId = 1;
  
      req.params.id = adId;
      req.user = { id: userId };
  
      client.query.mockResolvedValue({ rows: [{ id: adId }] });
      adDataMapper.delete.mockResolvedValue(null);
  
      await adController.delete(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(adDataMapper.delete).toHaveBeenCalledWith(adId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "L'annonce n'a pas pu être supprimé",
      });
    });
  
    it('should return 401 if the user is not authorized to delete the ad', async () => {
      const adId = 1;
      const userId = 1;
  
      req.params.id = adId;
      req.user = { id: userId };
  
      client.query.mockResolvedValue({ rows: [] });
  
      await adController.delete(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Vous n'êtes pas autorisé à supprimer l'annonce.",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const adId = 1;
      const userId = 1;
      const errorMessage = 'Database error';
  
      req.params.id = adId;
      req.user = { id: userId };
  
      client.query.mockRejectedValue(new Error(errorMessage));
  
      await adController.delete(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });


  //Edit 
  describe('adController.edit', () => {
    let req, res;
  
    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });
  
    it('should edit an ad if found and return it with status 200', async () => {
      const adId = 1;
      const userId = 1;
      const savedAd = { id: adId, title: 'Edited Ad' };
  
      req.params.id = adId;
      req.user = { id: userId };
      req.body = { title: 'Edited Ad' };
  
      client.query.mockResolvedValue({ rows: [{ id: adId }] });
      adDataMapper.edit.mockResolvedValue(savedAd);
  
      await adController.edit(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(adDataMapper.edit).toHaveBeenCalledWith(adId, req.body);
      expect(res.json).toHaveBeenCalledWith(savedAd);
    });
  
    it('should return 404 if the ad could not be edited', async () => {
      const adId = 1;
      const userId = 1;
  
      req.params.id = adId;
      req.user = { id: userId };
      req.body = { title: 'Edited Ad' };
  
      client.query.mockResolvedValue({ rows: [{ id: adId }] });
      adDataMapper.edit.mockResolvedValue(null);
  
      await adController.edit(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(adDataMapper.edit).toHaveBeenCalledWith(adId, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Votre annonce n'a pas été modifié.",
      });
    });
  
    it('should return 401 if the user is not authorized to edit the ad', async () => {
      const adId = 1;
      const userId = 1;
  
      req.params.id = adId;
      req.user = { id: userId };
      req.body = { title: 'Edited Ad' };
  
      client.query.mockResolvedValue({ rows: [] });
  
      await adController.edit(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Vous n'êtes pas autorisé à modifier l'annonce.",
      });
    });
  
    it('should handle errors and return 500 status', async () => {
      const adId = 1;
      const userId = 1;
      const errorMessage = 'Database error';
  
      req.params.id = adId;
      req.user = { id: userId };
      req.body = { title: 'Edited Ad' };
  
      client.query.mockRejectedValue(new Error(errorMessage));
  
      await adController.edit(req, res);
  
      expect(client.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
    });
  });
  
  
  