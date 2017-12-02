import React from 'react'
import Form from 'react-jsonschema-form'
import style from './CalledPageMainContainer.css'

class CalledPageMainContainer extends React.Component {
  componentWillMount() {
  }

  render() {
    const formData = {
      title: '',
    }
    const schema = {
      title: '',
      description: '',
      type: 'object',
      // required: [
      //   'firstName',
      //   'lastName',
      // ],
      properties: {
        employeeName: {
          type: 'string',
          title: 'Nome do colaborador',
        },
        phone: {
          type: 'string',
          title: 'Telefone',
        },
        city: {
          type: 'string',
          title: 'Municipio',
        },
        address: {
          type: 'string',
          title: 'Endereço',
        },
        number: {
          type: 'string',
          title: 'Numero',
        },
        neighborhood: {
          type: 'string',
          title: 'Bairro',
        },
        ref: {
          type: 'string',
          title: 'Referência',
        },
        patientName: {
          type: 'string',
          title: 'Nome do Paciente',
        },
        patientComplaint: {
          type: 'string',
          title: 'Queixa do Paciente',
        },
        numberEnumRadio: {
          type: 'number',
          title: 'Number enum',
          enum: [
            1,
            2,
            3,
          ],
        },
      },
    }

    const log = type => console.log.bind(console, type)

    return (
      <div className={style.mainContainer}>
        MAIN CONTAINER
        <Form
          schema={schema}
          formData={formData}
          onChange={log('changed')}
          onSubmit={log('submitted')}
          onError={log('errors')}
        />
      </div>
    )
  }
}

export default CalledPageMainContainer
