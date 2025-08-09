export const AddAuthorRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Doe',
    },
    nationality: {
      type: 'string',
      example: 'Irish',
    },
    biography: {
      type: 'string',
      example: 'He Lived a nice life',
    },
    birthDate: {
      type: 'string',
      format: 'date',
      example: '1960-10-01',
    },
    deathDate: {
      type: 'string',
      format: 'date',
      example: '2010-10-07',
    },
  },
};

export const AddAuthorResponseSchema = {
  type: 'object',
  properties: {
    author: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '8',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
        nationality: {
          type: 'string',
          example: 'Irish',
        },
        biography: {
          type: 'string',
          example: 'He Lived a nice life',
        },
        birthDate: {
          type: 'string',
          format: 'date',
          example: '1960-10-01',
        },
        deathDate: {
          type: 'string',
          format: 'date',
          example: '2010-10-07',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T07:02:51.699Z',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-02-16T07:02:51.699Z',
        },
      },
    },
  },
};

export const UpdateAuthorRequestSchema = AddAuthorRequestSchema;

export const UpdateAuthorResponseSchema = AddAuthorResponseSchema;

/**
 * {
    "status": "success",
    "data": {
        "Pollution": {
            "ts": "2025-08-09T15:00:00.000Z",
            "aqius": 62,
            "mainus": "p2",
            "aqicn": 31,
            "maincn": "o3"
        }
    }
}
*/
export const CityPollutionResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'success',
    },
    data: {
      type: 'object',
      properties: {
        Pollution: {
          type: 'object',
          properties: {
            ts: {
              type: 'string',
              format: 'date-time',
              example: '2025-08-09T15:00:00.000Z',
            },
            aqius: {
              type: 'number',
              example: 62,
            },
            mainus: {
              type: 'string',
              example: 'p2',
            },
            aqicn: {
              type: 'number',
              example: 31,
            },
            maincn: {
              type: 'string',
              example: 'o3',
            },
          },
        },
      },
    },
  },
};

/**
 * {
    "message": "Query validation failed",
    "status": "failed",
    "errorCode": "@error-codes/query-validation-failed",
    "meta": {
        "errors": [
            {
                "message": "\"longitude\" is required",
                "path": "longitude"
            }
        ]
    }
}
 */
export const CityPollutionValidationErrorResponseSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Query validation failed',
    },
    status: {
      type: 'string',
      example: 'failed',
    },
    errorCode: {
      type: 'string',
      example: '@error-codes/query-validation-failed',
    },
    meta: {
      type: 'object',
      properties: {
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: '"longitude" is required',
              },
              path: {
                type: 'string',
                example: 'longitude',
              },
            },
          },
        },
      },
    },
  },
};

/**
 * {
    "status": "success",
    "data": {
        "aqius": 90,
        "mainus": "p2",
        "timestamp": "2025-08-09T03:44:00.780Z"
    }
}
 */
export const ParisMostPollutionResponseSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      example: 'success',
    },
    data: {
      type: 'object',
      properties: {
        aqius: {
          type: 'number',
          example: 90,
        },
        mainus: {
          type: 'string',
          example: 'p2',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-08-09T03:44:00.780Z',
        },
      },
    },
  },
};
