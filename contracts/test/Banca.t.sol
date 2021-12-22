// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.11;

import { DSTest } from 'ds-test/test.sol';
import { Banca } from '../Banca.sol';

// solhint-disable comprehensive-interface
contract BancaTest is DSTest {
  Banca private banca;

  function setUp() external {
    banca = new Banca();
  }

  function testExample() external {
    assertTrue(address(banca) != address(0));
  }
}
