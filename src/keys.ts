import {BindingMetadata} from '@loopback/core';
import {MetadataAccessor} from '@loopback/metadata';

export const BINDING_METADATA_KEY = MetadataAccessor.create<BindingMetadata, ClassDecorator>('command.metadata')
