const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Client CRUD
router.post('/', clientController.createClient);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

// Service History
router.get('/:id/service-history', clientController.getServiceHistory);
router.post('/:id/service-history', clientController.addServiceHistory);

// Case Management
router.get('/:id/cases', clientController.getClientCases);
router.post('/:id/cases', clientController.createCase);

// Consent Agreements
router.get('/:id/consents', clientController.getConsentAgreements);
router.post('/:id/consents', clientController.addConsentAgreement);

// Assessments
router.get('/:id/assessments', clientController.getAssessments);
router.post('/:id/assessments', clientController.addAssessment);

module.exports = router;
