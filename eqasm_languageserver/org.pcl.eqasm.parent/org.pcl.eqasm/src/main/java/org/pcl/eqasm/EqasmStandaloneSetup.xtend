/*
 * generated by Xtext 2.18.0
 */
package org.pcl.eqasm


/**
 * Initialization support for running Xtext languages without Equinox extension registry.
 */
class EqasmStandaloneSetup extends EqasmStandaloneSetupGenerated {

	def static void doSetup() {
		new EqasmStandaloneSetup().createInjectorAndDoEMFRegistration()
	}
}
