#
# Supported ECR image releases. Fedora-based, custom Linux.
#
# - https://gallery.ecr.aws/lambda/nodejs
# - https://github.com/aws/aws-lambda-base-images
#
FROM public.ecr.aws/lambda/nodejs:{{nodeVersion}}

ARG BASE_DIR
ARG USER
ARG GROUP=${USER}
ARG UID
ARG GID=${UID}

RUN dnf -y install gcc git gzip libyaml-devel make shadow-utils tar

# Install app dependencies.
RUN npm install -g pm2

ENV PATH="${PATH}:/usr/sbin"

# Create shared workspace.
RUN groupadd -g ${UID} ${USER}
RUN useradd -u ${UID} -g ${GID} -G root -s /usr/bin/bash -m ${USER}
RUN chown ${USER}:${GROUP} ${BASE_DIR}

USER ${USER}

WORKDIR ${BASE_DIR}
