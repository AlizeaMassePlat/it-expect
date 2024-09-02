const categoryController = require('./app/controller/api/categoryController');
const categoryDataMapper = require('./app/models/category');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('./app/models/category');

describe('categoryController.getAll', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should return all categories with status 200', async () => {
    const categories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
    categoryDataMapper.getAll.mockResolvedValue(categories);

    await categoryController.getAll(req, res);

    expect(categoryDataMapper.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(categories);
  });

  it('should return 404 if no categories found', async () => {
    categoryDataMapper.getAll.mockResolvedValue(null);

    await categoryController.getAll(req, res);

    expect(categoryDataMapper.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Nous n'avons trouvé aucun profil d'utilisateur·ice.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const errorMessage = 'Database error';
    categoryDataMapper.getAll.mockRejectedValue(new Error(errorMessage));

    await categoryController.getAll(req, res);

    expect(categoryDataMapper.getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
});
});

describe('categoryController.edit', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should edit a category and return it with status 200', async () => {
    const categoryId = 1;
    const editedCategory = { id: categoryId, name: 'Edited Category' };
    
    req.params.id = categoryId;
    categoryDataMapper.edit.mockResolvedValue(editedCategory);

    await categoryController.edit(req, res);

    expect(categoryDataMapper.edit).toHaveBeenCalledWith(categoryId);
    expect(res.json).toHaveBeenCalledWith(editedCategory);
  });

  it('should return 404 if the category could not be edited', async () => {
    const categoryId = 1;
    
    req.params.id = categoryId;
    categoryDataMapper.edit.mockResolvedValue(null);

    await categoryController.edit(req, res);

    expect(categoryDataMapper.edit).toHaveBeenCalledWith(categoryId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Votre categorie n'a pas pu être modifiée.",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const categoryId = 1;
    const errorMessage = 'Database error';
    
    req.params.id = categoryId;
    categoryDataMapper.edit.mockRejectedValue(new Error(errorMessage));

    await categoryController.edit(req, res);

    expect(categoryDataMapper.edit).toHaveBeenCalledWith(categoryId);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
});
});

describe('categoryController.delete', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should delete a category and return it with status 200', async () => {
    const categoryId = 1;
    const deletedCategory = { id: categoryId, name: 'Deleted Category' };
    
    req.params.id = categoryId;
    categoryDataMapper.delete.mockResolvedValue(deletedCategory);

    await categoryController.delete(req, res);

    expect(categoryDataMapper.delete).toHaveBeenCalledWith(categoryId);
    expect(res.json).toHaveBeenCalledWith(deletedCategory);
  });

  it('should return 404 if the category could not be deleted', async () => {
    const categoryId = 1;
    
    req.params.id = categoryId;
    categoryDataMapper.delete.mockResolvedValue(null);

    await categoryController.delete(req, res);

    expect(categoryDataMapper.delete).toHaveBeenCalledWith(categoryId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "Votre catégorie n'a pas pu être supprimée",
    });
  });

  it('should handle errors and return 500 status', async () => {
    const categoryId = 1;
    const errorMessage = 'Database error';
    
    req.params.id = categoryId;
    categoryDataMapper.delete.mockRejectedValue(new Error(errorMessage));

    await categoryController.delete(req, res);

    expect(categoryDataMapper.delete).toHaveBeenCalledWith(categoryId);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(`Error: ${errorMessage}`);
});
});
