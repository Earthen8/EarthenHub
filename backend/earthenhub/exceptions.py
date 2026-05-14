from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def global_exception_handler(exc, context):
    """
    Standardized error response for all API exceptions.
    Returns: { "error": "Type", "message": "Details", "status": 4xx/5xx }
    """
    # Call DRF's default exception handler first to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Standardize the response structure for DRF-handled errors (400, 401, 403, 404, etc.)
        custom_data = {
            'error': exc.__class__.__name__,
            'message': response.data.get('detail', response.data),
            'status': response.status_code
        }
        response.data = custom_data
    else:
        # Handle non-DRF errors (like 500 Server Errors)
        # This part requires a bit of care to not leak sensitive info in production,
        # but for development/portfolio, we want to know what happened.
        response = Response({
            'error': 'ServerError',
            'message': str(exc),
            'status': 500
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
