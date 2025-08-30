from fastapi import FastAPI, Request
import time

def logger_middlewares(app: FastAPI):
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.time()

        response = await call_next(request)

        duration = time.time() - start_time
        print(f"{request.method} {request.url} completed in {duration:.2f}s")

        # add processing time to response headers
        response.headers["X-Process-Time"] = str(duration)

        return response
