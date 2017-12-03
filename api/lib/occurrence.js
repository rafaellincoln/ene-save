const Joi = require('joi')
const Boom = require('boom')
const NodeGeocoder = require('node-geocoder')
const DB = require('../models')
const { sendNotification } = require('../utils/sendNotification')
// const validations = require('../utils/joiValidation')

console.log(sendNotification)

const Occurrence = DB['occurrence']
const Patient = DB['patient']
const OccurrencePatient = DB['occurrence_patient']
const Resource = DB['resource']

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBxO1klN9XsIQaGABWIc63A9K4f9xZKroU', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/occurrence',
    config: {
      description: 'Occurrence',
      validate: {
        query: {
          filter: Joi.string().optional().default({}).description('filter')
        }
      }
    },
    handler: function (request, reply) {
      Occurrence.findAll({
        where: request.query.filter,
        include: [{
          model: Patient,
          as: 'p'
        }]
      }).then((occurrence) => {
        reply(occurrence)
      })
    }
  })

  server.route({
    method: 'GET',
    path: '/occurrence/{id}',
    config: {
      description: 'Occurrence by ID',
      validate: {
        params: {
          id: Joi.number().required().description('Occurrence ID')
        }
      }
    },
    handler: function (request, reply) {
      Occurrence.findById(request.params.id, {
        include: [{
          model: Patient,
          as: 'p'
        }]
      }).then((occurrence) => {
        reply(occurrence)
      })
    }
  })

  server.route({
    method: 'PUT',
    path: '/occurrence/{id}',
    config: {
      description: 'Occurrence by ID',
      validate: {
        params: {
          id: Joi.number().required().description('Occurrence ID')
        },
        payload: {
          id_resource: Joi.number().optional(),
          name_solicitant: Joi.string().required(),
          phone: Joi.string().optional(),
          city: Joi.string().required(),
          address: Joi.string().required(),
          number_address: Joi.string().optional(),
          complement: Joi.string().optional(),
          neighborhood: Joi.string().optional(),
          reference_address: Joi.string().optional(),
          complaint_patient: Joi.string().required(),
          comments: Joi.string().optional(),
          emergency: Joi.string().optional(),
          id_patient: Joi.number().required(),
          name_patient: Joi.string().required(),
          age: Joi.number().optional(),
          blood_type: Joi.string().optional(),
          gender: Joi.string().optional(),
          allergy: Joi.array().items(Joi.string()).optional(),
          complaint_patient: Joi.string().required(),
          informations_patient: Joi.string().required(),
          multimedia_communication: Joi.object().optional()
        }
      }
    },
    handler: function (request, reply) {
      const payload = request.payload

      const occurrence = {
        name_solicitant: payload.name_solicitant,
        city: payload.city,
        address: payload.address,
        complaint_patient: payload.complaint_patient
      }

      if (payload.id_resource)
        occurrence.id_resource = payload.id_resource
      if (payload.phone)
        occurrence.phone = payload.phone
      if (payload.number_address)
        occurrence.number_address = payload.number_address
      if (payload.complement)
        occurrence.complement = payload.complement
      if (payload.neighborhood)
        occurrence.neighborhood = payload.neighborhood
      if (payload.reference_address)
        occurrence.reference_address = payload.reference_address
      if (payload.comments)
        occurrence.comments = payload.comments
      if (payload.emergency)
        occurrence.emergency = payload.emergency

      const fullAddress = occurrence.address + ', ' + occurrence.number_address + ' ' +
        occurrence.number_address + ' ' + occurrence.neighborhood + ' ' + occurrence.city

      console.log(fullAddress)

      geocoder.geocode(occurrence, function (err, res) {
        console.log(res);
      });

      const patient = {
        name_patient: payload.name_patient
      }

      if (payload.age)
        patient.birth_year = new Date().getFullYear - payload.age
      if (payload.blood_type)
        patient.blood_type = payload.blood_type
      if (payload.gender)
        patient.gender = payload.gender
      if (payload.allergy)
        patient.allergy = payload.allergy

      const occurrencePatient = {
        complaint_patient: payload.complaint_patient
      }

      if (payload.informations_patient)
        occurrencePatient.informations_patient = payload.informations_patient
      if (payload.multimedia_communication)
        occurrencePatient.multimedia_communication = payload.multimedia_communication

      return DB.sequelize.transaction({
        isolationLevel: DB.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
      }, function (t) {
        return Occurrence.update(occurrence, {
          where: { id_occurrence: request.params.id },
          transaction: t
        }).then(() => (
          Patient.update(patient, {
            where: { id_patient: payload.id_patient },
            transaction: t
          }).then(() => (
            OccurrencePatient.update(occurrencePatient, {
              where: {
                id_occurrence: request.params.id,
                id_patient: payload.id_patient,
              },
              transaction: t
            })
          ))
        ))
      })
      .then(() => {
        reply({ success: true })
      })
      .catch(function (err) {
        const error = Boom.badRequest(err);
        reply(error);
      });
    }
  })

  server.route({
    method: 'POST',
    path: '/occurrence',
    config: {
      description: 'Occurrence by ID',
      validate: {
        payload: {
          id_resource: Joi.number().optional(),
          name_solicitant: Joi.string().required(),
          phone: Joi.string().optional(),
          city: Joi.string().required(),
          address: Joi.string().required(),
          number_address: Joi.string().optional(),
          complement: Joi.string().optional(),
          neighborhood: Joi.string().optional(),
          reference_address: Joi.string().optional(),
          comments: Joi.string().optional(),
          emergency: Joi.string().required(),
          id_patient: Joi.number().optional(),
          name_patient: Joi.string().required(),
          age: Joi.number().optional(),
          blood_type: Joi.string().optional(),
          gender: Joi.string().optional(),
          allergy: Joi.array().items(Joi.string()).optional(),
          complaint_patient: Joi.string().required(),
          informations_patient: Joi.string().optional(),
          multimedia_communication: Joi.object().optional()
        }
      }
    },
    handler: function (request, reply) {
      const payload = request.payload

      const occurrence = {
        name_solicitant: payload.name_solicitant,
        city: payload.city,
        address: payload.address,
        complaint_patient: payload.complaint_patient,
        emergency: payload.emergency
      }

      if (payload.id_resource)
        occurrence.id_resource = payload.id_resource
      if (payload.phone)
        occurrence.phone = payload.phone
      if (payload.number_address)
        occurrence.number_address = payload.number_address
      if (payload.complement)
        occurrence.complement = payload.complement
      if (payload.neighborhood)
        occurrence.neighborhood = payload.neighborhood
      if (payload.reference_address)
        occurrence.reference_address = payload.reference_address
      if (payload.comments)
        occurrence.comments = payload.comments

      const type = payload.emergency === 'Y' ? 1 : 2

      occurrence.status = [{ type, date: new Date() }]

      geocoder.geocode(occurrence).then((res) => {

        occurrence.location = {
          lat: res[0].latitude,
          long: res[0].longitude
        }

        const patient = {
          name_patient: payload.name_patient
        }

        if (payload.age)
          patient.birth_year = new Date().getFullYear - payload.age
        if (payload.blood_type)
          patient.blood_type = payload.blood_type
        if (payload.gender)
          patient.gender = payload.gender
        if (payload.allergy)
          patient.allergy = payload.allergy

        const occurrencePatient = {
          complaint_patient: payload.complaint_patient
        }

        if (payload.informations_patient)
          occurrencePatient.informations_patient = payload.informations_patient
        if (payload.multimedia_communication)
          occurrencePatient.multimedia_communication = payload.multimedia_communication

        return DB.sequelize.transaction({
          isolationLevel: DB.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        }, function (t) {
          return Occurrence.create(occurrence, {
            transaction: t
          }).then((oc) => (
            Patient.create(patient, {
              transaction: t
            }).then((p) => {
              occurrencePatient.id_occurrence = oc.id_occurrence
              occurrencePatient.id_patient = p.id_patient
              return OccurrencePatient.create(occurrencePatient, {
                transaction: t
              })
            })
          ))
        })
        .then(() => {
          return reply({ success: true })
        })
        .catch(function (err) {
          const error = Boom.badRequest(err);
          reply(error);
        });
      })
    }
  })

  server.route({
    method: 'PUT',
    path: '/occurrence/action',
    config: {
      description: 'Change status occurrence',
      validate: {
        payload: {
          id: Joi.number().required().description('Occurrence ID'),
          status: Joi.array().items(Joi.object().keys({ type: Joi.number(), date: Joi.date() })),
          resource: Joi.number().optional()
        }
      }
    },
    handler: function (request, reply) {
      const occurrence = {}

      Occurrence.findById(request.payload.id).then((item) => {
        occurrence.status = item.status || []

        if (request.payload.status) {
          occurrence.status = occurrence.status.concat(request.payload.status)
        }

        if (request.payload.resource)
          occurrence.resource = request.payload.resource

        Occurrence.update(occurrence, {
          where: { id_occurrence: request.payload.id }
        }).then((occurrence) => {
          const statusLength = request.payload.status.length
          const status = request.payload.status[statusLength -1].type
          if (status === 3) {
            return Resource.findById(request.payload.resource)
              .then((resource) => {
                var message = {
                  include_player_ids: [ resource.player_id ],
                  data: { idOccurrence: request.payload.id }
                };
  
                sendNotification(message)
                return reply(occurrence)
              })
          }
          reply(occurrence)
        })
      })
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'occurrence',
  version: require('../package.json').version
};