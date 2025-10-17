const Client = require('../models/Client');
const ServiceHistory = require('../models/ServiceHistory');
const CaseManagement = require('../models/CaseManagement');
const ConsentAgreement = require('../models/ConsentAgreement');
const Assessment = require('../models/Assessment');

// Create new client
exports.createClient = async (req, res) => {
  try {
    const clientData = {
      ...req.body,
      createdBy: req.user.id
    };

    if (!clientData.firstName || !clientData.lastName) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const client = await Client.create(clientData);
    res.status(201).json({
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ error: 'Failed to create client' });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const { search, limit, offset } = req.query;
    const clients = await Client.findAll({ 
      search, 
      limit: parseInt(limit) || 100, 
      offset: parseInt(offset) || 0 
    });
    res.json({ clients });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ error: 'Failed to retrieve clients' });
  }
};

// Get client by ID
exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ client });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({ error: 'Failed to retrieve client' });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await Client.update(req.params.id, req.body);
    res.json({ message: 'Client updated successfully' });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ error: 'Failed to update client' });
  }
};

// Delete client (soft delete)
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    await Client.delete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
};

// Get client service history
exports.getServiceHistory = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const history = await ServiceHistory.findByClientId(req.params.id, {
      limit: parseInt(limit) || 50,
      offset: parseInt(offset) || 0
    });
    res.json({ history });
  } catch (error) {
    console.error('Get service history error:', error);
    res.status(500).json({ error: 'Failed to retrieve service history' });
  }
};

// Add service history entry
exports.addServiceHistory = async (req, res) => {
  try {
    const serviceData = {
      clientId: req.params.id,
      ...req.body,
      providedBy: req.user.id
    };

    const entry = await ServiceHistory.create(serviceData);
    res.status(201).json({
      message: 'Service history entry created successfully',
      entry
    });
  } catch (error) {
    console.error('Add service history error:', error);
    res.status(500).json({ error: 'Failed to add service history entry' });
  }
};

// Get client cases
exports.getClientCases = async (req, res) => {
  try {
    const cases = await CaseManagement.findByClientId(req.params.id);
    res.json({ cases });
  } catch (error) {
    console.error('Get client cases error:', error);
    res.status(500).json({ error: 'Failed to retrieve client cases' });
  }
};

// Create case
exports.createCase = async (req, res) => {
  try {
    const caseData = {
      clientId: req.params.id,
      caseManagerId: req.user.id,
      ...req.body
    };

    const caseRecord = await CaseManagement.create(caseData);
    res.status(201).json({
      message: 'Case created successfully',
      case: caseRecord
    });
  } catch (error) {
    console.error('Create case error:', error);
    res.status(500).json({ error: 'Failed to create case' });
  }
};

// Get consent agreements
exports.getConsentAgreements = async (req, res) => {
  try {
    const consents = await ConsentAgreement.findByClientId(req.params.id);
    res.json({ consents });
  } catch (error) {
    console.error('Get consent agreements error:', error);
    res.status(500).json({ error: 'Failed to retrieve consent agreements' });
  }
};

// Add consent agreement
exports.addConsentAgreement = async (req, res) => {
  try {
    const consentData = {
      clientId: req.params.id,
      witnessedBy: req.user.id,
      ...req.body
    };

    const consent = await ConsentAgreement.create(consentData);
    res.status(201).json({
      message: 'Consent agreement created successfully',
      consent
    });
  } catch (error) {
    console.error('Add consent agreement error:', error);
    res.status(500).json({ error: 'Failed to add consent agreement' });
  }
};

// Get assessments
exports.getAssessments = async (req, res) => {
  try {
    const { type } = req.query;
    const assessments = await Assessment.findByClientId(req.params.id, type);
    res.json({ assessments });
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({ error: 'Failed to retrieve assessments' });
  }
};

// Add assessment
exports.addAssessment = async (req, res) => {
  try {
    const assessmentData = {
      clientId: req.params.id,
      assessedBy: req.user.id,
      ...req.body
    };

    const assessment = await Assessment.create(assessmentData);
    res.status(201).json({
      message: 'Assessment created successfully',
      assessment
    });
  } catch (error) {
    console.error('Add assessment error:', error);
    res.status(500).json({ error: 'Failed to add assessment' });
  }
};
