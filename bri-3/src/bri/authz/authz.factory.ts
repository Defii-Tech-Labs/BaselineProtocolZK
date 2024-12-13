import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { BpiSubjectRoleName } from '../identity/bpiSubjects/models/bpiSubjectRole';
import {
  BpiSubject,
  BpiSubjectAccount,
  BpiAccount,
  Workgroup,
  Workflow,
  Workstep,
  Transaction,
  Message,
  BpiSubjectRole,
} from '@prisma/client';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

type AppSubjects =
  | 'all'
  | Subjects<{
      BpiSubject: BpiSubject;
      Workgroup: Workgroup;
      Workstep: Workstep;
      Workflow: Workflow;
      BpiSubjectAccount: BpiSubjectAccount;
      BpiAccount: BpiAccount;
      Transaction: Transaction;
      Message: Message;
    }>;
export type AppAbility = PureAbility<[string, AppSubjects], PrismaQuery>;

type DefinePermissions = (
  user: BpiSubject,
  builder: AbilityBuilder<AppAbility>,
) => void;

const rolePermissions: Record<BpiSubjectRoleName, DefinePermissions> = {
  [BpiSubjectRoleName.INTERNAL_BPI_SUBJECT](bpiSubject, { can }) {
    can('manage', 'all');
  },
  [BpiSubjectRoleName.EXTERNAL_BPI_SUBJECT](bpiSubject, { can }) {
    can('read', 'BpiSubject', { id: bpiSubject.id });
    can('update', 'BpiSubject', { id: bpiSubject.id });
    can('delete', 'BpiSubject', { id: bpiSubject.id });

    const onlyWorkgroupAdmin = {
      administrators: { some: { id: bpiSubject.id } },
    };
    can('read', 'Workgroup', onlyWorkgroupAdmin);
    can('update', 'Workgroup', onlyWorkgroupAdmin);
    can('delete', 'Workgroup', onlyWorkgroupAdmin);

    const onlyWorkgroupAdminOfAssociatedWorkgroup = {
      workgroup: { is: { administrators: { some: { id: bpiSubject.id } } } },
    };
    can('read', 'Workflow', onlyWorkgroupAdminOfAssociatedWorkgroup);
    can('update', 'Workflow', onlyWorkgroupAdminOfAssociatedWorkgroup);
    can('delete', 'Workflow', onlyWorkgroupAdminOfAssociatedWorkgroup);

    can('read', 'Workstep', onlyWorkgroupAdminOfAssociatedWorkgroup);
    can('update', 'Workstep', onlyWorkgroupAdminOfAssociatedWorkgroup);
    can('delete', 'Workstep', onlyWorkgroupAdminOfAssociatedWorkgroup);

    can('read', 'BpiSubjectAccount', { ownerBpiSubjectId: bpiSubject.id });
    can('update', 'BpiSubjectAccount', { ownerBpiSubjectId: bpiSubject.id });
    can('delete', 'BpiSubjectAccount', { ownerBpiSubjectId: bpiSubject.id });

    const onlyOwnerOfAssociatedBpiSubjectAccounts = {
      ownerBpiSubjectAccounts: { some: { ownerBpiSubjectId: bpiSubject.id } },
    };
    can('read', 'BpiAccount', onlyOwnerOfAssociatedBpiSubjectAccounts);
    can('update', 'BpiAccount', onlyOwnerOfAssociatedBpiSubjectAccounts);
    can('delete', 'BpiAccount', onlyOwnerOfAssociatedBpiSubjectAccounts);
  },
};

@Injectable()
export class AuthzFactory {
  buildAuthzFor(
    bpiSubject: BpiSubject & { roles: BpiSubjectRole[] },
  ): AppAbility {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    // this is just for start, once there are more roles, this should be modified a bit
    const role = bpiSubject.roles[0]?.name;
    if (typeof rolePermissions[role] === 'function') {
      rolePermissions[role](bpiSubject, builder);
    } else {
      throw new Error(`Trying to use unknown role "${role}"`);
    }
    return builder.build();
  }
}
