import { AbstractDocument } from '@app/common/database/abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { filter } from 'rxjs';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(private readonly model: Model<TDocument>) {
    model.syncIndexes();
  }

  async createBulk(document: Omit<TDocument, '_id'>[]): Promise<TDocument[]> {
    try {
      const createdDocument = await this.model.collection.insertMany(document, {
        ordered: false,
      });
      return createdDocument as unknown as TDocument[];
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Could not create the products');
    }
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    skip: number = 0,
  ): Promise<TDocument | null> {
    const document = await this.model
      .findOne(filterQuery)
      .skip(skip)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      return null;
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true, // Return the updated document after the operation
        upsert: true, // Insert the document if no match is found
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    limit: number = 10,
    skip: number = 0,
  ): Promise<any> {
    const data = await this.model
      .find(filterQuery, { _id: 0 })
      .skip(skip)
      .limit(limit)
      .lean<TDocument[]>(true);

    return data;
  }

  async filter(
    filterQuery: FilterQuery<TDocument>,
    limit: number = 10,
  ): Promise<any> {
    const page = filterQuery.page || 1;
    const filter: any = {};
    delete filterQuery.page;
    const skip = (page - 1) * limit;
    const projection: any = { ecommerceBrandId: 0, subCategories: 0 };
    if (filterQuery.title) {
      filter.title = { $regex: new RegExp(filterQuery.title, 'i') }; // Case-insensitive regex
    }

    if (filterQuery.name) {
      filter.name = { $regex: new RegExp(filterQuery.name, 'i') }; // Case-insensitive regex
    }

    if (filterQuery.category) {
      filter.category = filterQuery.category; // Exact match
    }
    if (filterQuery.priceRange) {
      filter.price = {
        $gte: filterQuery.priceRange.min,
        $lte: filterQuery.priceRange.max,
      }; // Range filter
    }

    if (filterQuery.excludeSubCategories) {
      projection.subCategories = 0;
    }

    const data = await this.model
      .find(filter, projection) // 'i' for case-insensitive
      .skip(skip)
      .limit(limit)
      .lean<TDocument[]>(true);

    const totalCount = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  async count(filterQuery: FilterQuery<TDocument>): Promise<number> {
    return this.model.countDocuments(filterQuery);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument | null> {
    return await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
