// import { Code } from '../common/code';
// import { Exception } from '../common/exception';
// import { Optional } from '../common/common-types';
// import { ClassValidationDetails, ClassValidator } from '../util/class-validator/class-validator';
// import { Logger } from "@nestjs/common";

export class Entity {

  public async validate(): Promise<void> {
    // const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    // if (details) {
    //   Logger.error( details.errors );
    //   const error = Exception.new({ code: Code.ENTITY_VALIDATION_ERROR, data: details });
    // }
  }

}
