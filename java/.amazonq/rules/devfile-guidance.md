# Amazon Q Devfile Guide

## Scope

* Applies when asked to 'Create a devfile'.

## Rules

* Save as `devfile.yaml` in your project root
* Use public Docker images only (DockerHub, public ECR)
* Follow devfile 2.2.0 schema
* Only `install`, `build`, and `test` commands are supported
* Commands must complete within 5 minutes
* Use only public artifact repositories (PyPI, npmjs)
* Don't reference resources requiring authentication

## Example: Python Project

```yaml
schemaVersion: 2.0.0
components:
  - name: dev 
    container:
      image: public.ecr.aws/aws-mde/universal-image:latest
commands:
  - id: install
    exec:
      component: dev
      commandLine: "pip3.11 install -r requirements.txt"
  - id: test 
    exec:
      component: dev
      commandLine: "python3.11 manage.py makemigrations && python3.11 manage.py test"
```

## Example: Node.js Project

```yaml
schemaVersion: 2.0.0
components:
  - name: dev 
    container:
      image: public.ecr.aws/aws-mde/universal-image:latest
commands:
  - id: install
    exec:
      component: dev
      commandLine: "npm install"
  - id: build
    exec:
      component: dev
      commandLine: "npm run build"
  - id: test 
    exec:
      component: dev
      commandLine: "npm run test"
```
