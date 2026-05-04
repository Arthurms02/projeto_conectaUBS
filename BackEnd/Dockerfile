# 1. Usa a imagem slim para economizar (muito) espaço e tempo
FROM python:3.11-slim

# 4. Impede arquivos .pyc residuais
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala os pacotes do GeoDjango e ferramentas de compilação
RUN apt-get update && apt-get install -y \
    binutils \
    gdal-bin \
    libgdal-dev \
    libproj-dev \
    gcc \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Atualiza ferramentas base do pip e instala dependências
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

# 3. Expõe a porta e define o comando de inicialização padrão
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]